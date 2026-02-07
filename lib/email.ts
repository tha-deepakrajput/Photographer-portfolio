import nodemailer from "nodemailer";

export async function sendContactEmail(data: {
  name: string;
  email: string;
  shootType: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `New Photography Inquiry – ${data.shootType}`,
    replyTo: data.email,
    text: `
Name: ${data.name}
Email: ${data.email}
Shoot Type: ${data.shootType}

Message:
${data.message}
    `,
  });
}
