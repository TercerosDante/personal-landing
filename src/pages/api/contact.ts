import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';

/**
 * Contact endpoint for the portfolio.
 *
 * This is the only on-demand route: `prerender = false` makes Astro emit it as
 * a Vercel Serverless Function while every page stays statically prerendered.
 * It validates input with Zod, screens a honeypot, and relays the message
 * through Resend. `resend` and `zod` run only here and never reach the browser.
 */
export const prerender = false;

/** Single source of truth for what the endpoint accepts. */
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().max(255).pipe(z.email()),
  message: z.string().trim().min(10).max(3000),
});

type ContactInput = z.infer<typeof contactSchema>;

// Verified sender on the ronaldterceros.com domain (configured in Resend).
const FROM = 'Portfolio Contact <hello@ronaldterceros.com>';

const json = (data: unknown, status: number): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHtml(d: ContactInput & { timestamp: string }): string {
  return `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:14px;color:#222a36;line-height:1.6">
  <h2 style="margin:0 0 12px;font-size:16px">New portfolio message</h2>
  <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(d.name)}</p>
  <p style="margin:0 0 4px"><strong>Email:</strong> <a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a></p>
  <p style="margin:0 0 12px;color:#838a99"><strong>Received:</strong> ${escapeHtml(d.timestamp)}</p>
  <div style="padding:14px 16px;background:#f3f1ec;border-radius:10px;white-space:pre-wrap">${escapeHtml(d.message)}</div>
</div>`;
}

/**
 * Verify a Cloudflare Turnstile token. Only called when TURNSTILE_SECRET_KEY is
 * set, so the form keeps working until the keys are configured on the project.
 */
async function verifyTurnstile(
  secret: string,
  token: string,
  request: Request,
): Promise<boolean> {
  if (!token) return false;
  const form = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) form.set('remoteip', ip);
  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body: form },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error('[contact] Turnstile verification failed:', err);
    return false;
  }
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    console.error('[contact] Missing RESEND_API_KEY or CONTACT_EMAIL.');
    return json({ error: 'server_error' }, 500);
  }

  // Reject oversized payloads before parsing (cheap anti-abuse). The Zod schema
  // also caps each field, so a legitimate request is far under this.
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 16_384) {
    return json({ error: 'payload_too_large' }, 413);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'invalid_input' }, 400);
  }

  // Honeypot: a hidden field real users never see. If a bot fills it, accept
  // the request silently (no signal to the bot) and send nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return json({ ok: true }, 200);
  }

  // Turnstile check, active only when the secret is configured on the project.
  const tsSecret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (tsSecret) {
    const token =
      typeof body.turnstileToken === 'string' ? body.turnstileToken : '';
    if (!(await verifyTurnstile(tsSecret, token, request))) {
      return json({ error: 'verification_failed' }, 403);
    }
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: 'invalid_input' }, 400);
  }

  const { name, email, message } = parsed.data;
  const timestamp = new Date().toISOString();

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to,
      replyTo: email,
      subject: `Portfolio Contact - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nReceived: ${timestamp}\n\n${message}`,
      html: renderHtml({ name, email, message, timestamp }),
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return json({ error: 'send_failed' }, 502);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return json({ error: 'server_error' }, 500);
  }
};
