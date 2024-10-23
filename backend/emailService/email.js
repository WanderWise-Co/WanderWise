const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
            user:"bharathsindhe03@gmail.com",
            pass: process.env.EMAIL_PASSWORD
        }
    }
)
const sendEmail = async (to, subject, body) => {
    console.log('sending email now');
    let mailOption = {
        to,
        from: "bharathsindhe03@gmail.com",
        subject,
        html: body
    };
    console.log('sending email');
    // Ensure transporter is correctly defined (assume nodemailer)
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOption, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(res);
                resolve(res);
            }
        });
    });
};


module.exports = {sendEmail};