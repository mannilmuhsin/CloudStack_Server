const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
        pass: process.env.PASS,
  },
});

exports.sendVerificationEmail = async (email, token) => {
  const mailOptions = {
    from: 'mapApp@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on this link: http://localhost:5173/verify/${token}`,
  };

  await transporter.sendMail(mailOptions);
};