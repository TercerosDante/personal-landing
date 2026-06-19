/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Resend API key (server-only secret), read by src/pages/api/contact.ts. */
  readonly RESEND_API_KEY?: string;
  /** Inbox that receives contact-form submissions (Reply-To = the sender). */
  readonly CONTACT_EMAIL?: string;
}
