import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  console.log("Transporter created", transporter);

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: ${process.env.FRONTEND_URL}/api/auth/verify?token=${token}`,
  };

  console.log("Mail options created", mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};
