import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

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

    // 1. Send Notification to Ilyan
    const sendPayload = (fromAddress: string) => ({
      from: fromAddress.includes("@") ? fromAddress : `Ilyan Khan <${fromAddress}>`,
      to: [recipient],
      reply_to: email,
      subject: `[Portfolio Contact] New message from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #051F20; color: #DAF1DE; padding: 32px; border-radius: 8px;">
          <h2 style="color: #8EB69B; margin-top: 0;">New Contact Form Submission</h2>
          <div style="background-color: #0B2B26; border: 1px solid #163832; border-radius: 6px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #8EB69B;">${email}</a></p>
            <p style="margin: 0;"><strong>Message:</strong></p>
            <div style="white-space: pre-wrap; background-color: #051F20; border: 1px solid #163832; border-radius: 4px; padding: 14px; margin-top: 8px; color: #DAF1DE;">
              ${message}
            </div>
          </div>
          <p style="font-size: 12px; color: #8EB69B; margin: 0;">
            Direct reply enabled — simply reply to this email to contact ${name}.
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

    // 2. Send Automated Confirmation Email to Visitor (If using custom domain)
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
            to: [email],
            subject: `Thank you for reaching out, ${name}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #051F20; color: #DAF1DE; padding: 32px; border-radius: 8px;">
                <h2 style="color: #8EB69B; margin-top: 0;">Message Received</h2>
                <p>Hi ${name},</p>
                <p>Thank you for getting in touch. I've received your note and will review it and get back to you shortly.</p>
                <div style="background-color: #0B2B26; border: 1px solid #163832; border-radius: 6px; padding: 16px; margin: 20px 0;">
                  <p style="font-size: 13px; color: #8EB69B; margin: 0 0 6px 0;">Your message:</p>
                  <p style="margin: 0; font-size: 14px; white-space: pre-wrap;">${message}</p>
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API contact error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
