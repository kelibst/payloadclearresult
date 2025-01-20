
import nodemailer from 'nodemailer'; // Example - use any email library
import { EmailAdapter, PayloadEmailAdapter, SendEmailOptions } from 'payload';

export const myCustomEmailAdapter = async (): Promise<EmailAdapter> => {
    const transporter = await nodemailer.createTransport({
      host: 'smtp.mailtrap.io', // Or your Mailjet SMTP server
      port: 2525, // Or your Mailjet port
      auth: {
        user: process.env.MAIL_TRAP_USER, // Or your Mailjet credentials
        pass: process.env.MAIL_TRAP_PASS,
      },
    });
  
    return {
      // Correct implementation:
      sendEmail: async (message: SendEmailOptions) => {
        console.log('Sending email with custom adapter:', message);
  
        try {
          const result = await transporter.sendMail({
            from: message.from,
            to: message.to,
            subject: message.subject,
            html: message.html,  // Make sure to handle both html and text
            text: message.text,
          });
  
          console.log('Email sent successfully:', result);
          return result; // Return the result from transporter.sendMail
        } catch (error) {
          console.error('Error sending email:', error);
          throw error; // Re-throw the error to be handled higher up
        }
      },
    };
  };

