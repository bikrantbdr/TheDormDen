<<<<<<< HEAD
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        // port: 465,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_EMAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMPT_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);
}

=======
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        // port: 465,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_EMAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMPT_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);
}

>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
module.exports = sendEmail;