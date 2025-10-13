import nodemailer from "nodemailer";

// Create transporter with SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Email sending function for OTP
export async function sendOTPEmail(email: string, otp: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Your Terra Sign-In Code",
    text: `Hi there,

${otp} is your one-time password to sign into Terra.

If you did not request this, someone may have typed in your email by accident. You can safely ignore this message.

Thanks,
The Terra Team`,
    html: `<p>Hi there,</p>

<p><strong>${otp}</strong> is your one-time password to sign into Terra.</p>

<p>If you did not request this, someone may have typed in your email by accident. You can safely ignore this message.</p>

<p>Thanks,<br>The Terra Team</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, error };
  }
}
