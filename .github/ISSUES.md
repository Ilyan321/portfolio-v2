# 📌 Pending Issues & Tasks for Next Session

---

### Issue #1: Complete Supabase pgvector RAG Ingestion & Fix Embedding Pipeline
- **Status:** In Progress / Blocked on Token Permission
- **Description:** 
  Hugging Face Serverless Inference API returned `403 Forbidden` (`This authentication method does not have sufficient permissions to call Inference Providers on behalf of user Ilyankhan69`).
- **Resolution Plan:**
  1. Regenerate Hugging Face token with *Inference Providers / Serverless Inference* permission checked (or switch to Google Gemini Embeddings / local ONNX runtime in `backend/update_brain.py`).
  2. Run bulk ingestion across all 15 public and private repositories (`python3 backend/update_brain.py --all`).
  3. Wire the FastAPI backend (`backend/main.py`) `/api/chat` route to vectorize incoming user queries, query `match_documents` in Supabase pgvector, and inject matching chunks into the Groq prompt.
  4. Test streaming AI responses in the terminal UI with full context on all projects.

---

### Issue #2: Admin Dashboard Authentication Session Expiration & Auto-Logout
- **Status:** Resolved
- **Description:**
  Currently, `/admin` directly opens without prompting for credentials across sessions because `app/api/auth/login/route.ts` sets `maxAge: 60 * 60 * 24 * 7` (1 week persistent cookie).
- **Resolution:**
  1. Converted `admin_token` into a strict Session Cookie by removing `maxAge` in `app/api/auth/login/route.ts` (invalidated when browser session closes).
  2. Updated `middleware.ts` to redirect authenticated sessions from `/admin/login` directly to `/admin`.

