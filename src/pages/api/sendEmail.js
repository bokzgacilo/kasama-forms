import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { body } = req;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const now = new Date();

  const formattedDate = now.toLocaleString("en-US", {
    month: "short",   // Dec
    day: "numeric",   // 1
    year: "numeric",  // 2025
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  try {
    function escapeHtml(str) {
      if (str == null) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    await transporter.sendMail({
      from: `"Kasama Forms Internal" <${process.env.APP_EMAIL}>`,
      to: "bokzgacilo@gmail.com",
      subject: `New Form Submission - Form #${req.id}`,
      text: JSON.stringify(body, null, 2),
      html: `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
      </head>
      <body style="margin:0;padding:0;background:#f6f8fa;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <tr>
            <td align="center" style="padding:24px;">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #eef0f2;">
                    <h2 style="margin:0;font-size:18px;font-weight:600;">New Form Submission</h2>
                    <p style="margin:6px 0 0;font-size:13px;color:#59606a;">Date: ${escapeHtml(formattedDate)}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#111827;">
                      <tr>
                        <td style="padding:8px 0;vertical-align:top;width:140px;font-weight:600;">Name</td>
                        <td style="padding:8px 0;">${escapeHtml(body.first_name)} ${escapeHtml(body.last_name)}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;vertical-align:top;font-weight:600;">Email</td>
                        <td style="padding:8px 0;">${escapeHtml(body.email)}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;vertical-align:top;font-weight:600;">Company</td>
                        <td style="padding:8px 0;">${escapeHtml(body.company)}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;vertical-align:top;font-weight:600;">Message</td>
                        <td style="padding:8px 0;white-space:pre-wrap;">${escapeHtml(body.message)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 24px 20px;font-size:12px;color:#6b7280;border-top:1px solid #eef0f2;">
                    <p style="margin:0;">This email was sent by Kasama Forms.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim(),
    });

    return res.status(200).json({
      status: "sent",
      download_link: body.link,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
}
