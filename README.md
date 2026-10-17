This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Nexovate participation certificate email delivery

This feature adds a private admin screen at `/admin/certificates` to send one participation certificate PDF to one student at a time. The existing Vite + React Router website remains the app; no Next.js migration is required.

### Setup

1. In Supabase SQL Editor, run `supabase/migrations/202610170001_certificate_email_delivery.sql`.
2. Create/confirm an admin user in Supabase Authentication. Then approve that user's UUID by running the following SQL, replacing the UUID with the user's Auth UID:
   ```sql
   insert into public.certificate_email_admins (user_id)
   values ('REPLACE-WITH-AUTH-USER-UUID');
   ```
   Only users listed in this table can send certificates or read delivery history.
3. In Resend, verify the sending domain/address you intend to use. Set the exact verified sender address as `CERTIFICATE_FROM_EMAIL`.
4. Set the public frontend variables in your local `.env.local` or Vercel project settings using `.env.example`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy the Supabase Edge Function and set server-only secrets:
   ```bash
   supabase functions deploy send-participation-certificate
   supabase secrets set RESEND_API_KEY=re_xxxxxxxxx CERTIFICATE_FROM_EMAIL="Nexovate <certificates@your-verified-domain>" APP_ORIGIN=https://nexovate.org.in
   ```
   Supabase provides `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to Edge Functions. Never add the service-role key or Resend API key to frontend environment variables.
6. Build and deploy the website. Visit `https://nexovate.org.in/admin/certificates`, sign in using the approved Supabase Auth user, fill in the student's details, and attach a PDF (8 MB maximum).

### Delivery behavior and security

- PDFs are checked for a PDF signature and stored in a private `certificate-pdfs` Storage bucket.
- Emails are sent server-side via Resend. The email includes the event name and a PDF attachment.
- The delivery history records pending/sending/sent/failed states, provider message ID, attempt count, timestamps, and an error message for failed sends.
- A failed record can be retried from the history after selecting its original certificate PDF again. Already-sent records cannot be retried through the function.
- The browser's publishable/anon key is not a secret. The service-role key and Resend API key must remain server-side.
- A `sent` status means the email provider accepted the request; it does not guarantee that the recipient's inbox received it. For actual delivery/bounce events, configure Resend webhooks separately.
- If a provider request times out, check Resend's activity/logs before retrying to avoid a duplicate email. Provider acceptance and database status updates cannot be made one atomic transaction.

### Route note

The admin route is intentionally not linked from public navigation, but it is not protected by obscurity; authorization is enforced by the Edge Function. This feature does not add QR verification or bulk sending.
