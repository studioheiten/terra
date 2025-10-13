You will implement email OTP sign in using `better-auth` and Node Mailer.

# Requirements

1. Implement the Node Mailer service, with all credentials pointing to .env variables.

2. Implement the email sending function in packages/auth/lib/email.ts and send an email with this text:

Hi there,

{{ OTP }} is your one-time password to sign into Terra.

If you did not request this, someone may have typed in your email by accident. You can safely ignore this message.

Thanks,
The Terra Team

3. Implement two server functions in the Next.js app under /app/(routes)/login/lib.ts:
   1. requestVerificationCode(email)
   2. verifyCode(email, code)

4. Use these two functions in the UI under /login/page.tsx to make the authentication operational. Do not redirect after this; just have this part finished, and we'll take it from there.
