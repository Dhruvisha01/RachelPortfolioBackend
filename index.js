const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.post('/send-email', async (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // or use your SMTP provider
        auth: {
            user: 'rachsadeh@gmail.com',
            pass: 'vxpfdjixxhvzdrqa', // use app password if 2FA is on
        },
    });

    const mailOptions = {
        from: email,
        to: 'rachsadeh@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).send('Failed to send email');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
