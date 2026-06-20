/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Resend API key (server-only secret), read by src/pages/api/contact.ts. */
  readonly RESEND_API_KEY?: string;
  /** Inbox that receives contact-form submissions (Reply-To = the sender). */
  readonly CONTACT_EMAIL?: string;
  /** Cloudflare Turnstile site key (public). Enables the contact-form widget. */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  /** Cloudflare Turnstile secret (server-only). Enables server verification. */
  readonly TURNSTILE_SECRET_KEY?: string;
}

interface Window {
  turnstile?: {
    render(el: HTMLElement, options: Record<string, unknown>): string;
    reset(widgetId?: string): void;
  };
  onTurnstileLoad?: () => void;
}
