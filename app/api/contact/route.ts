import { NextResponse } from "next/server";

// In-memory sliding window rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean up stale entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - entry.count, resetTime: entry.resetTime };
}

export async function POST(req: Request) {
  try {
    // 1. IP extraction & Rate limit check
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const { allowed, remaining, resetTime } = checkRateLimit(clientIp);

    if (!allowed) {
      const retryAfterSeconds = Math.ceil((resetTime - Date.now()) / 1000);
      return NextResponse.json(
        { error: "Too many contact submissions. Please wait before trying again." },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
            "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const { name, email, message, bot_field } = await req.json();

    // Honeypot check: If bot_field is populated, silently return success to drop bot spam
    if (bot_field) {
      return NextResponse.json({ success: true });
    }

    // 2. Strict Input Validation & Sanitization
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email) || email.length > 150) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5 || message.length > 3000) {
      return NextResponse.json(
        { error: "Message must be between 5 and 3000 characters." },
        { status: 400 }
      );
    }

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 }
      );
    }

    const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || "ilyaankhan342@gmail.com";
    const sender = process.env.SENDER_EMAIL || "onboarding@resend.dev";

    // 3. Send Notification to Ilyan
    const sendPayload = (fromAddress: string) => ({
      from: fromAddress.includes("@") ? fromAddress : `Ilyan Khan <${fromAddress}>`,
      to: [recipient],
      reply_to: sanitizedEmail,
      subject: `[Portfolio Contact] New message from ${sanitizedName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #051F20; color: #DAF1DE; padding: 32px; border-radius: 8px;">
          <h2 style="color: #8EB69B; margin-top: 0;">New Contact Form Submission</h2>
          <div style="background-color: #0B2B26; border: 1px solid #163832; border-radius: 6px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${sanitizedName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedEmail}" style="color: #8EB69B;">${sanitizedEmail}</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Origin IP:</strong> <span style="font-family: monospace; font-size: 11px; opacity: 0.7;">${clientIp}</span></p>
            <p style="margin: 0;"><strong>Message:</strong></p>
            <div style="white-space: pre-wrap; background-color: #051F20; border: 1px solid #163832; border-radius: 4px; padding: 14px; margin-top: 8px; color: #DAF1DE;">
              ${sanitizedMessage}
            </div>
          </div>
          <p style="font-size: 12px; color: #8EB69B; margin: 0;">
            Direct reply enabled — simply reply to this email to contact ${sanitizedName}.
          </p>
        </div>
      `,
    });

    let resNotification = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendPayload(sender)),
    });

    // If custom domain is not verified yet, fallback to onboarding@resend.dev
    if (!resNotification.ok && sender !== "onboarding@resend.dev") {
      resNotification = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendPayload("Portfolio Contact <onboarding@resend.dev>")),
      });
    }

    if (!resNotification.ok) {
      const errData = await resNotification.json().catch(() => ({}));
      console.error("Resend Notification Error:", errData);
      return NextResponse.json(
        { error: "Failed to dispatch notification email." },
        { status: 500 }
      );
    }

    // 4. Send Automated Confirmation Email to Visitor (If using custom verified domain)
    if (!sender.includes("onboarding@resend.dev")) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: `Ilyan Khan <${sender}>`,
            to: [sanitizedEmail],
            subject: `Thank you for reaching out, ${sanitizedName}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #051F20; color: #DAF1DE; padding: 32px; border-radius: 8px;">
                <h2 style="color: #8EB69B; margin-top: 0;">Message Received</h2>
                <p>Hi ${sanitizedName},</p>
                <p>Thank you for getting in touch. I've received your note and will review it and get back to you shortly.</p>
                <div style="background-color: #0B2B26; border: 1px solid #163832; border-radius: 6px; padding: 16px; margin: 20px 0;">
                  <p style="font-size: 13px; color: #8EB69B; margin: 0 0 6px 0;">Your message:</p>
                  <p style="margin: 0; font-size: 14px; white-space: pre-wrap;">${sanitizedMessage}</p>
                </div>
                <p style="margin-top: 24px;">Best regards,<br><strong>Ilyan Khan</strong><br><span style="font-size: 12px; color: #8EB69B;">Computer Systems Engineering · QUEST Nawabshah</span></p>
              </div>
            `,
          }),
        });
      } catch (confErr) {
        console.warn("Visitor confirmation email warning:", confErr);
      }
    }

    return NextResponse.json(
      { success: true },
      {
        headers: {
          "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
          "X-RateLimit-Remaining": String(remaining),
        },
      }
    );
  } catch (error) {
    console.error("API contact error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
