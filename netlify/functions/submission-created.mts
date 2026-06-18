import type { Context } from "@netlify/functions";

/**
 * Netlify Forms autoresponder.
 *
 * Event-triggered function: Netlify invokes a function named exactly
 * `submission-created` after every *verified* (non-spam) form submission,
 * for ALL forms on the site. We branch by form name:
 *   - `email-subscribe` → emails the requester their 2026 Pet Cost downloads.
 *   - `contact`         → emails the sender a "we got your message" confirmation.
 *
 * Required environment variable (Netlify → Site settings → Environment variables):
 *   RESEND_API_KEY   — your Resend API key (free tier: 3,000 emails/mo)
 * Optional:
 *   FROM_EMAIL       — verified sender, e.g. "PetCost Calculator <hello@petcost-calculator.com>"
 *   SITE_URL         — defaults to https://petcost-calculator.com
 */

const SITE_URL = (Netlify.env.get("SITE_URL") || "https://petcost-calculator.com").replace(/\/$/, "");
const FROM_EMAIL = Netlify.env.get("FROM_EMAIL") || "PetCost Calculator <hello@petcost-calculator.com>";

function shell(headingHtml: string, bodyHtml: string, footerHtml: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#F1F8F1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1B2B1B;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F8F1;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #C8E6C9;border-radius:16px;overflow:hidden;">
        <tr><td style="background:#2E7D32;padding:24px 28px;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;">${headingHtml}</h1>
        </td></tr>
        <tr><td style="padding:28px;">${bodyHtml}</td></tr>
        <tr><td style="padding:18px 28px;background:#E8F5E9;border-top:1px solid #C8E6C9;">
          <p style="margin:0;font-size:12px;color:#5a7a5a;">${footerHtml}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildSummaryHtml() {
  const link = (path: string) => `${SITE_URL}${path}`;
  const body = `
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Thanks for signing up! Here are your free downloads — click any link below to open the PDF:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:6px 0;"><a href="${link("/PetCost-Report-2026.pdf")}" style="display:block;background:#2E7D32;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:14px 18px;border-radius:12px;">📊 2026 Cost Data Summary →</a></td></tr>
      <tr><td style="padding:6px 0;"><a href="${link("/PetCost-Readiness-Checklist.pdf")}" style="display:block;background:#4CAF50;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:14px 18px;border-radius:12px;">✅ Pet Readiness Checklist →</a></td></tr>
      <tr><td style="padding:6px 0;"><a href="${link("/PetCost-Budget-Tracker.pdf")}" style="display:block;background:#4CAF50;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:14px 18px;border-radius:12px;">💰 Pet Budget Tracker →</a></td></tr>
    </table>
    <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#5a7a5a;">Want to estimate the cost of a specific breed? <a href="${link("/calculator")}" style="color:#2E7D32;font-weight:bold;">Run the calculator →</a></p>`;
  return shell("🐾 Your 2026 Pet Cost Data Summary", body,
    `You received this because you requested the data summary at <a href="${SITE_URL}" style="color:#2E7D32;">petcost-calculator.com</a>.`);
}

function buildContactHtml(name?: string) {
  const greeting = name && name.trim() ? `Hi ${name.trim()},` : "Hi there,";
  const body = `
    <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">${greeting}</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Thanks for getting in touch — we've received your message and will get back to you within <strong>1–2 business days</strong>.</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">In the meantime, feel free to explore the <a href="${SITE_URL}/calculator" style="color:#2E7D32;font-weight:bold;">cost calculator</a> or browse our <a href="${SITE_URL}/blog" style="color:#2E7D32;font-weight:bold;">guides</a>.</p>
    <p style="margin:0;font-size:15px;line-height:1.6;">— The PetCost Calculator team</p>`;
  return shell("🐾 We got your message", body,
    `This is an automated confirmation from <a href="${SITE_URL}" style="color:#2E7D32;">petcost-calculator.com</a>. No need to reply.`);
}

async function sendEmail(apiKey: string, to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend returned ${res.status}: ${detail}`);
  }
}

export default async (req: Request, _context: Context) => {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  // Netlify wraps the submission in { payload: {...} }; fall back to the raw body.
  const payload = body?.payload ?? body ?? {};
  const formName = payload.form_name || payload.data?.["form-name"];
  const email = payload.email || payload.data?.email;
  const name = payload.name || payload.data?.name;

  if (formName !== "email-subscribe" && formName !== "contact") {
    return new Response("Ignored (unhandled form)", { status: 200 });
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    console.warn("submission-created: no valid email in payload", { formName });
    return new Response("No valid email", { status: 200 });
  }

  const apiKey = Netlify.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("submission-created: RESEND_API_KEY is not set — cannot send email");
    return new Response("Email service not configured", { status: 200 });
  }

  try {
    if (formName === "email-subscribe") {
      await sendEmail(apiKey, email, "Your 2026 Pet Cost Data Summary 🐾", buildSummaryHtml());
      console.log(`submission-created: data summary emailed to ${email}`);
    } else {
      await sendEmail(apiKey, email, "We got your message — PetCost Calculator 🐾", buildContactHtml(name));
      console.log(`submission-created: contact confirmation emailed to ${email}`);
    }
    return new Response("Email sent", { status: 200 });
  } catch (err) {
    console.error("submission-created: error sending email", err);
    return new Response("Email send error", { status: 200 });
  }
};
