const nodemailer = require('nodemailer');

// If SMTP creds aren't configured, log the email instead of sending it —
// keeps the reset flow usable in local/dev without requiring a real mailbox.
const isConfigured = () =>
  process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS;

let transporter;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
};

exports.sendEmail = async ({ to, subject, text, html }) => {
  if (!isConfigured()) {
    console.log(`\n[email:dev-fallback] No EMAIL_HOST/EMAIL_USER/EMAIL_PASS configured — printing instead of sending.`);
    console.log(`  To:      ${to}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Body:\n${text}\n`);
    return;
  }

  await getTransporter().sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
};
