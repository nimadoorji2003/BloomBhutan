const nodemailer = require("nodemailer");

// Sender email credentials (use environment variables in production)
const senderEmail = "kinzasdorji66@gmail.com";
const senderPassword = "hiap vhia ycdt ocfz"; // Use environment variables for sensitive information

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});

/**
 * Function to send OTP for password reset
 * @param {string} email - The recipient's email address
 * @param {string} otpCode - The OTP code to be sent for password reset
 */
async function sendOTPEmail(email, otpCode) {
  const emailContent = `
    Dear User,

    We received a request to reset your password on Bloom Bhutan. Please use the following OTP to reset your password:

    OTP Code: ${otpCode}

    This code will expire in 10 minutes. If you did not request a password reset, please ignore this email.

    Sincerely,
    The Bloom Bhutan Team
  `;

  const mailOptions = {
    from: senderEmail,
    to: email,
    subject: "Bloom Bhutan Password Reset OTP",
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
}

// Export the sendOTPEmail function for use in controllers
module.exports = { sendOTPEmail };