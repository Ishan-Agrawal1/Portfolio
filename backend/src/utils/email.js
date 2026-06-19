import nodemailer from 'nodemailer';
import { logger } from './logger.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactNotification = async (contact) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL, // agrawalishan47@gmail.com
    subject: `New Contact Form Submission from ${contact.name}`,
    text: `
      You have received a new message from your portfolio contact form.
      
      Name: ${contact.name}
      Email: ${contact.email}
      Message:
      ${contact.message}
    `,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Message:</strong><br/>${contact.message.replace(/\n/g, '<br/>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info('Contact notification email sent successfully.');
  } catch (error) {
    logger.error('Error sending contact notification email:', { error: error.message });
  }
};

export const sendAutoReply = async (contact) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || process.env.ADMIN_EMAIL,
    to: contact.email,
    subject: 'Thank you for reaching out!',
    text: `Hi ${contact.name},\n\nThank you for reaching out, Ishan will contact you ASAP.\n\nBest regards,\nIshan Agrawal`,
    html: `
      <p>Hi ${contact.name},</p>
      <p>Thank you for reaching out, Ishan will contact you ASAP.</p>
      <br/>
      <p>Best regards,<br/>Ishan Agrawal</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info('Auto-reply email sent successfully to ' + contact.email);
  } catch (error) {
    logger.error('Error sending auto-reply email:', { error: error.message });
  }
};
