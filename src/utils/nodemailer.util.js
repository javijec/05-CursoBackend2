import { createTransport } from "nodemailer";

const { GOOGLE_EMAIL, GOOGLE_PASS } = process.env;

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GOOGLE_EMAIL,
    pass: GOOGLE_PASS,
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
  } catch (error) {
    console.log(error);
  }
};

const sentResetPasswordEmail = async ({ to, verifyCode }) => {
  try {
    await transporter.verify();
    await transporter.sendMail({
      from: GOOGLE_EMAIL,
      to,
      subject: "Reset your password",
      html: `<h1>Reset your password</h1><p>Your verification code is: ${verifyCode}</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};

export { sentVerifyEmail, sentResetPasswordEmail };
