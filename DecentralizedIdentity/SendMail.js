const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env

// Create a transporter with your Gmail account
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'agreharshit610@gmail.com', // replace with your Gmail email address
    pass: 'lbqxavlpxnewvczt'         // replace with your Gmail password or app-specific password
  }
});

// Function to send an email with a PIN
async function sendEmail(pin, toEmail) {
  try {
    // Define email options
    const mailOptions = {
      from: 'agreharshit610@gmail.com',   // replace with your Gmail email address
      to: toEmail,
      subject: 'PIN Verification',
      text: `Your PIN is: ${pin}`
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

function getVerificationPin() {
  // Use process.env to get the verification pin from the environment variables
  return process.env.VERIFICATION_PIN || '';
}

function generatePin() {
  const pinLength = 8;
  const pinArray = Array.from({ length: pinLength }, () => Math.floor(Math.random() * 10));
  const pinString = pinArray.join('');
  return pinString;
}

module.exports = {
  generatePin,
  getVerificationPin,
  sendEmail
}