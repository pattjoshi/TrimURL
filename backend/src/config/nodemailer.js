import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    password: process.env.SMPT_PASS,
  },
});

export default transporter;
// 1:21:11
