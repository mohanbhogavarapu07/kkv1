import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use the 16-character app password here
  }
});

// Verify transporter
transporter.verify(function (error, success) {
  if (error) {
    console.log('Error verifying transporter:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

export default transporter;