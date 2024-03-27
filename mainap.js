const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'dkssundram@outlook.com',
    pass: 'Shivam1@'
  }
});

const emailService = {
  sendEmail: async (to, subject, text) => {
    try {
      await transporter.sendMail({
        from: 'dkssundram@outlook.com',
        to: to,
        subject: subject,
        text: text
      });

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
};

emailService.sendEmail('deepakkumar@jmangroup.com', 'Test Subject', 'Test Message');
