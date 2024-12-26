import { createTransport } from "nodemailer";

const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = process.env;

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GOOGLE_EMAIL,
    pass: GOOGLE_PASSWORD,
  },
});

const sentVerifyEmail = async ({ to, verifyCode }) => {
  try {
    await transporter.verify();
    await transporter.sendMail({
      from: GOOGLE_EMAIL,
      to,
      subject: "Verify your email",
      html: `<h1>Verify your email</h1><p>Your verification code is: ${verifyCode}</p>`,
    });
  } catch (error) {}
};

export { sentVerifyEmail };
