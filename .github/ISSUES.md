# 📌 Pending Issues & Tasks for Next Session

---

### Issue #1: Complete Supabase pgvector RAG Ingestion & Fix Embedding Pipeline
- **Status:** Resolved
- **Description:** 
  Hugging Face Serverless Inference API returned `403 Forbidden` (`This authentication method does not have sufficient permissions to call Inference Providers on behalf of user Ilyankhan69`).
- **Resolution:**
  1. Updated Hugging Face token with Inference Provider permissions and switched model to `BAAI/bge-small-en-v1.5` (384d vectors matching Supabase `vector(384)`).
  2. Ingested all repositories via `backend/update_brain.py --all` into Supabase `portfolio_documents` table.
  3. Wired FastAPI `/api/chat` route in `backend/main.py` to embed user queries, search Supabase pgvector via `match_documents` RPC, and inject matching context chunks into Groq inference.
  4. Verified streaming RAG AI responses with sub-second latency and deep project knowledge.

---

### Issue #2: Admin Dashboard Authentication Session Expiration & Auto-Logout
- **Status:** Resolved
- **Description:**
  Currently, `/admin` directly opens without prompting for credentials across sessions because `app/api/auth/login/route.ts` sets `maxAge: 60 * 60 * 24 * 7` (1 week persistent cookie).
- **Resolution:**
  1. Converted `admin_token` into a strict Session Cookie by removing `maxAge` in `app/api/auth/login/route.ts` (invalidated when browser session closes).
  2. Updated `middleware.ts` to redirect authenticated sessions from `/admin/login` directly to `/admin`.

