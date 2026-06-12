# Playtest Signup & Feedback System

This folder contains the complete playtest workflow: sign-up form, landing page, and feedback collection.

## Files

**Sign-up:**
- `SignupForm.tsx` — Main form component
- `page.tsx` — Signup landing page (hero, benefits, FAQs)

**Feedback:**
- `FeedbackForm.tsx` — Bug/feedback form component
- `feedback/page.tsx` — Feedback landing page with guidelines

**API Endpoints (at project root):**
- `/api/playtest-signup.ts` — Writes to "Responses" sheet
- `/api/playtest-feedback.ts` — Writes to "Feedback" sheet

## URLs

- Sign-up: `/playtest-signup`
- Feedback: `/playtest-signup/feedback`

## Setup

See `PLAYTEST_SETUP.md` in the project root for complete setup instructions.

### Quick Start

1. Create a Google Sheet named "Playtest Signups" with two sheets:
   - "Responses" (columns: Timestamp, Email, Name, Experience, Discord)
   - "Feedback" (columns: Timestamp, Email, Type, Title, Description, Severity, Steps, Status)
2. Share with your service account email
3. Add Vercel environment variables:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
4. Deploy to Vercel
5. Test at `/playtest-signup`

## Workflow

1. Testers sign up at `/playtest-signup`
2. You send them download + feedback link at end of week
3. Testers play and submit feedback via `/playtest-signup/feedback`
4. All responses auto-populate the Google Sheet for easy tracking
