import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

interface QuestionResult {
  question: string;
  chosen: string;
  correct: string;
  isCorrect: boolean;
}

interface ResultPayload {
  parentName: string;
  parentEmail: string;
  childName: string;
  comprehensionTitle: string;
  year: number;
  score: number;
  total: number;
  questionResults: QuestionResult[];
}

function storeEmail(parentEmail: string, parentName: string, childName: string) {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, "subscribers.json");
    let subscribers: unknown[] = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      subscribers = JSON.parse(raw);
    }
    const exists = (subscribers as { email: string }[]).some((s) => s.email === parentEmail);
    if (!exists) {
      (subscribers as object[]).push({
        email: parentEmail,
        name: parentName,
        childName,
        addedAt: new Date().toISOString(),
        source: "quiz",
      });
      fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));
    }
  } catch {
    // Non-critical — don't fail the request if storage fails
  }
}

function buildEmailHtml(data: ResultPayload): string {
  const scorePercent = Math.round((data.score / data.total) * 100);
  const scoreColour = data.score >= 4 ? "#1a7a3a" : data.score >= 3 ? "#f5a623" : "#e53935";
  const gradeEmoji = data.score === 5 ? "🌟" : data.score >= 4 ? "⭐" : data.score >= 3 ? "👍" : "💪";
  const message =
    data.score === 5
      ? "Perfect score — absolutely brilliant!"
      : data.score >= 4
      ? "Excellent work — nearly perfect!"
      : data.score >= 3
      ? "Good job — keep practising!"
      : "Well done for trying — let's review and try again!";

  const rows = data.questionResults
    .map(
      (qr, i) => `
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:10px 8px;font-size:14px;color:#555;">${i + 1}. ${qr.question}</td>
        <td style="padding:10px 8px;text-align:center;font-size:18px;">${qr.isCorrect ? "✅" : "❌"}</td>
        ${
          !qr.isCorrect
            ? `<td style="padding:10px 8px;font-size:13px;color:#e53935;">Correct: <strong>${qr.correct}</strong></td>`
            : `<td style="padding:10px 8px;font-size:13px;color:#1a7a3a;">Correct!</td>`
        }
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:30px 10px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0f5228,#1a7a3a);padding:30px;text-align:center;">
            <div style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#1a7a3a;border:2px solid #f5a623;text-align:center;line-height:44px;font-weight:bold;color:#f5a623;font-size:14px;margin-bottom:12px;">11+</div>
            <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:800;">SCG Tuitions</h1>
            <p style="color:#f5a623;margin:4px 0 0;font-size:14px;font-weight:600;">Masterminds Quiz Results</p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding:28px 32px 20px;">
            <p style="margin:0;font-size:16px;color:#333;">Dear <strong>${data.parentName}</strong>,</p>
            <p style="margin:12px 0 0;font-size:15px;color:#555;line-height:1.6;">
              <strong>${data.childName}</strong> has just completed the <strong>${data.comprehensionTitle}</strong> comprehension quiz (Year ${data.year} English) on SCG Masterminds. Here are the results:
            </p>
          </td>
        </tr>

        <!-- Score Badge -->
        <tr>
          <td style="padding:0 32px 24px;text-align:center;">
            <div style="display:inline-block;background:${scoreColour};color:#fff;font-size:36px;font-weight:800;padding:16px 40px;border-radius:16px;letter-spacing:2px;">
              ${gradeEmoji} ${data.score} / ${data.total}
            </div>
            <p style="margin:12px 0 0;font-size:15px;color:#555;">${scorePercent}% — ${message}</p>
          </td>
        </tr>

        <!-- Question Breakdown -->
        <tr>
          <td style="padding:0 32px 28px;">
            <h3 style="color:#0f5228;margin:0 0 12px;font-size:16px;">Question Breakdown</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e8f5e9;border-radius:12px;overflow:hidden;">
              <tr style="background:#e8f5e9;">
                <th style="padding:10px 8px;text-align:left;font-size:13px;color:#0f5228;">Question</th>
                <th style="padding:10px 8px;text-align:center;font-size:13px;color:#0f5228;">Result</th>
                <th style="padding:10px 8px;text-align:left;font-size:13px;color:#0f5228;">Detail</th>
              </tr>
              ${rows}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f0faf0;padding:20px 32px;text-align:center;border-top:1px solid #e8f5e9;">
            <p style="margin:0;font-size:13px;color:#888;">This email was sent from <strong style="color:#1a7a3a;">SCG Tuitions Masterminds</strong>.</p>
            <p style="margin:8px 0 0;font-size:12px;color:#aaa;">You are receiving this because a quiz was completed using this email address.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const data: ResultPayload = await req.json();

  // Store email for marketing
  storeEmail(data.parentEmail, data.parentName, data.childName);

  // If no SMTP config, return success (for dev/demo)
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.FROM_EMAIL || "noreply@scgtuitions.co.uk";

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("[SCG] Email would be sent to:", data.parentEmail, "Score:", data.score);
    return NextResponse.json({ ok: true, note: "SMTP not configured — email logged only" });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: `SCG Tuitions Masterminds <${fromEmail}>`,
    to: data.parentEmail,
    subject: `${data.childName}'s Quiz Results — ${data.comprehensionTitle} (${data.score}/${data.total})`,
    html: buildEmailHtml(data),
  });

  return NextResponse.json({ ok: true });
}
