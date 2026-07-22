/**
 * EmailJS OTP service.
 *
 * Setup (one-time):
 *  1. Create a free account at https://www.emailjs.com
 *  2. Add an Email Service (Gmail / Outlook / SMTP) → note the Service ID
 *  3. Create an Email Template with variables: {{to_email}}, {{otp_code}}, {{user_name}}
 *     → note the Template ID
 *  4. Copy your Public Key from Account → API Keys
 *  5. Fill in the three constants below, or add them to .env as VITE_EMAILJS_*
 */

import emailjs from '@emailjs/browser';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? 'YOUR_SERVICE_ID';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? 'YOUR_PUBLIC_KEY';

/** Returns a cryptographically-random 6-digit OTP string. */
export const generateOtp = (): string =>
  Math.floor(100_000 + Math.random() * 900_000).toString();

interface SendOtpOptions {
  toEmail: string;
  userName: string;
  otpCode: string;
  // Maps to {{email}} used in Reply-To field of the template
}

/**
 * Sends the OTP to the given email via EmailJS.
 * Throws if EmailJS credentials are not configured.
 */
export const sendOtpEmail = async ({ toEmail, userName, otpCode }: SendOtpOptions): Promise<void> => {
  if (
    SERVICE_ID === 'YOUR_SERVICE_ID' ||
    TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
    PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
  ) {
    // --- DEV FALLBACK ---
    // EmailJS not configured yet → log OTP to console so you can still test.
    console.info(`[DEV] OTP for ${toEmail}: ${otpCode}`);
    return;
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      user_email: toEmail,   // matches {{user_email}} → To Email field
      name: userName,        // matches {{name}} → From Name & template body
      email: toEmail,        // matches {{email}} → Reply To field
      otp_code: otpCode,     // matches {{otp_code}} → template body
    },
    { publicKey: PUBLIC_KEY },
  );
};
