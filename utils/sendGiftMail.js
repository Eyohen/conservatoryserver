
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async (from, email, giftemail, subject, text, date, time, menu, crockery, tea, coffee, iceTea) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    const mailOptions = (recipient) => ({
        from: from,
        to: recipient,
        subject: subject,
        text: text,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title> Confirmation of Your Booking at Iro Lagos Conservatory + Etiquette Guidelines</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            padding: 20px;
        }
        .header {
            background-color: #5b3e31;
            color: white;
            padding: 10px;
            text-align: center;
        }
        .content {
            margin: 20px 0;
        }
        .content p {
            font-size: 16px;
            color: #333333;
        }
        .content ul {
            list-style-type: none;
            padding: 0;
        }
        .content ul li {
            background-color: #f9f9f9;
            margin: 5px 0;
            padding: 10px;
            border: 1px solid #dddddd;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Confirmation</h1>
        </div>
        <div class="content">
            <p>Congratulations! You’ve been gifted an afternoon tea experience at Iro Lagos Conservatory! Below are the details of your appointment.
:</p>
            <ul>
               <li><strong>Date:</strong> ${new Date(date).toDateString()}</li>
                <li><strong>Time:</strong> ${time}</li>
                <li><strong>Location:</strong> 7/12 Rumens roads, Ikoyi.</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Menu:</strong> ${menu}</li>
                <li><strong>Crockery:</strong> ${crockery}</li>
                <li><strong>Tea:</strong> ${tea ? tea : "none"}</li>
                <li><strong>Coffee:</strong> ${coffee ? coffee : "none"}</li>
                <li><strong>Ice Tea:</strong> ${iceTea ? iceTea : "none"}</li>
            </ul>
        </div>
        <div class="footer">
            <p>To ensure an enjoyable and smooth experience for all our guests, we kindly ask that you
observe the following etiquette guidelines during your visit:</p>
             <ul>
               <li>1. Punctuality: Please arrive at least 10 minutes before your scheduled appointment to
                    allow for check-in and preparation.</li>
               <li>2. Mobile Phones: Keep your phones in silent mode to maintain a tranquil atmosphere for
                    everyone.</li>
               <li>3. Respect: Treat our staff, other guests, and the surroundings with courtesy and respect.</li>

            </ul>
            <p>Warm regards,</p>
            <p>The Conservatory at IroLagos.</p>
        </div>
    </div>
</body>
</html>`
    });

    try {
        await transporter.sendMail(mailOptions(email));
        console.log("Email sent successfully to", email);

        if (giftemail) {
            await transporter.sendMail(mailOptions(giftemail));
            console.log("Email sent successfully to", giftemail);
        }
    } catch (error) {
        console.log("Email not sent!");
        console.log(error);
        return error;
    }
};