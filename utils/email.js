// Import the nodemailer library for sending emails
const nodemailer = require("nodemailer");

// Load environment variables from a .env file into process.env
require("dotenv").config();

/**
 * Create a transporter object using the default SMTP transport.
 * The transporter is used to send emails.
 */
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail as the email service
  auth: {
    user: process.env.EMAIL_USER, // Email address from environment variables
    pass: process.env.EMAIL_PASSWORD, // Email password from environment variables
  },
});

/**
 * Function to send an email.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text body of the email.
 */
const sendEmail = (to, subject, text) => {
  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to, // Recipient address
    subject, // Subject line
    text, // Plain text body
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // Log an error if one occurs
      console.log(error);
    } else {
      // Log a success message if the email is sent
      console.log("Email sent: " + info.response);
    }
  });
};

// Export the sendEmail function for use in other parts of the application
module.exports = sendEmail;
