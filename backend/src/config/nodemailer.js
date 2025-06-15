import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMPT_PASS, // Note: the env variable has a typo (SMPT vs SMTP)
  },
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP verification failed:", error);
  } else {
    console.log("SMTP server is ready to send emails");
  }
});

export default transporter;
