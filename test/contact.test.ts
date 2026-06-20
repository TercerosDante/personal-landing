import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Resend before the route module is imported (hoisted by Vitest).
const { send } = vi.hoisted(() => ({ send: vi.fn() }));
vi.mock('resend', () => ({
  Resend: class {
    emails = { send };
  },
}));

import { POST, contactSchema, escapeHtml } from '../src/pages/api/contact';

type Ctx = Parameters<typeof POST>[0];

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Hello, this is a genuine enquiry about a role.',
};

function post(
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const request = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
  return POST({ request } as unknown as Ctx) as Promise<Response>;
}

beforeEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  send.mockResolvedValue({ data: { id: 'eml_1' }, error: null });
  vi.stubEnv('RESEND_API_KEY', 're_test');
  vi.stubEnv('CONTACT_EMAIL', 'inbox@example.com');
});

describe('contactSchema', () => {
  it('accepts a valid payload', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it('rejects a too-short name', () => {
    expect(contactSchema.safeParse({ ...valid, name: 'A' }).success).toBe(
      false,
    );
  });
  it('rejects an invalid email', () => {
    expect(
      contactSchema.safeParse({ ...valid, email: 'not-an-email' }).success,
    ).toBe(false);
  });
  it('rejects a too-short message', () => {
    expect(
      contactSchema.safeParse({ ...valid, message: 'short' }).success,
    ).toBe(false);
  });
  it('trims fields', () => {
    const r = contactSchema.safeParse({ ...valid, name: '  Ada  ' });
    expect(r.success && r.data.name).toBe('Ada');
  });
});

describe('escapeHtml', () => {
  it('escapes HTML-significant characters', () => {
    expect(escapeHtml('<b>"&"</b>')).toBe(
      '&lt;b&gt;&quot;&amp;&quot;&lt;/b&gt;',
    );
  });
});

describe('POST /api/contact', () => {
  it('returns 500 when env vars are missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    const res = await post(valid);
    expect(res.status).toBe(500);
    expect(send).not.toHaveBeenCalled();
  });

  it('returns 413 for oversized bodies', async () => {
    const res = await post(valid, { 'content-length': '20000' });
    expect(res.status).toBe(413);
    expect(send).not.toHaveBeenCalled();
  });

  it('returns 400 for malformed JSON', async () => {
    const res = await post('{ not json');
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it('silently accepts a tripped honeypot and sends nothing', async () => {
    const res = await post({ ...valid, website: 'http://spam' });
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it('returns 400 for invalid input', async () => {
    const res = await post({ ...valid, message: 'short' });
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it('sends the email and returns 200 on a valid request', async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(send).toHaveBeenCalledOnce();
    const payload = send.mock.calls[0][0] as {
      replyTo: string;
      subject: string;
    };
    expect(payload.replyTo).toBe(valid.email);
    expect(payload.subject).toContain(valid.name);
  });

  it('returns 502 when Resend reports an error', async () => {
    send.mockResolvedValue({ data: null, error: { message: 'rejected' } });
    const res = await post(valid);
    expect(res.status).toBe(502);
  });

  it('returns 403 when Turnstile is on but the token is missing', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'ts_secret');
    const res = await post(valid);
    expect(res.status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it('sends when Turnstile verification passes', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'ts_secret');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ json: async () => ({ success: true }) }),
    );
    const res = await post({ ...valid, turnstileToken: 'tok' });
    expect(res.status).toBe(200);
    expect(send).toHaveBeenCalledOnce();
  });
});
