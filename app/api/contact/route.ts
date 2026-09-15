import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "contact@azizaghanagdiyev.com";
// Domain verified with Resend — sending from your own domain now.
const FROM_EMAIL = "Website Contact <contact@azizaghanagdiyev.com>";

interface ContactPayload {
  name: string;
  email: string;
  topic: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const topic = (body.topic ?? "").trim();

    if (!name || !email || !topic || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "All fields are required and email must be valid." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${topic}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(topic).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}