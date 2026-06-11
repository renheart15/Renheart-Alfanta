import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Resolve .env relative to this file (server/.env), not cwd
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

/* ── Nodemailer transporter (Gmail SMTP) ──────── */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,   // your Gmail address
    pass: process.env.SMTP_PASS,   // Gmail App Password (16 chars)
  },
});

/* ── POST /api/contact ─────────────────────────── */
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  /* Basic validation */
  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required." });
  }

  const mailToYou = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to:   process.env.SMTP_USER,          // sends to yourself
    replyTo: email,                        // so you can just hit Reply
    subject: `Portfolio inquiry from ${name || "a visitor"}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#0ea5e9;margin-bottom:4px">New message from your portfolio</h2>
        <hr style="border:1px solid #e2e8f0;margin-bottom:20px"/>
        <p><strong>Name:</strong> ${name || "—"}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left:3px solid #0ea5e9;margin:0;padding:12px 16px;background:#f0f9ff;border-radius:4px;white-space:pre-wrap">${message}</blockquote>
        <hr style="margin-top:24px;border:1px solid #e2e8f0"/>
        <p style="color:#94a3b8;font-size:12px">Sent via your portfolio contact form</p>
      </div>
    `,
  };

  /* Auto-reply to the sender */
  const mailToSender = {
    from: `"Renheart Alfanta" <${process.env.SMTP_USER}>`,
    to:   email,
    subject: "Got your message — I'll be in touch!",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#0ea5e9">Hey ${name || "there"}, thanks for reaching out!</h2>
        <p>I've received your message and will get back to you as soon as possible, usually within 24–48 hours.</p>
        <p>Here's a copy of what you sent:</p>
        <blockquote style="border-left:3px solid #0ea5e9;margin:0;padding:12px 16px;background:#f0f9ff;border-radius:4px;white-space:pre-wrap">${message}</blockquote>
        <p style="margin-top:24px">Talk soon,<br/><strong>Renheart Alfanta</strong></p>
        <hr style="margin-top:24px;border:1px solid #e2e8f0"/>
        <p style="color:#94a3b8;font-size:12px">You're receiving this because you filled out the contact form at renheartdev.vercel.app</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToSender);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`✉  Contact server running on http://localhost:${PORT}`);
});
