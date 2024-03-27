// backend/src/utils/emailService.js

const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.office.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'dkssundram@outlook.com',
    pass: 'Shivam1@'
  }
  
});

const emailService = {
  sendEmail: async (to, subject, text) => {
    try {
      // Send mail with defined transport object
      await transporter.sendMail({
        from: 'dkssundram@outlook.com',
        to: 'deepakkumar@jmangroup.com',
        subject:'Demo',
        text:'Hello Deepak'
      });

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
};

// module.exports = emailService;
