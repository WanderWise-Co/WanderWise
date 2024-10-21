const nodemailer = require('nodemailer');
const transpoter = nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
            user:"bharathsindhe03@gmail.com",
            pass: process.env.emailPass
        }
    }
)
const sendEmail = async (to,subject,body)=>{
    let mailOption = {
        to  ,
        from: "bharathsindhe03@gmail.com",
        subject,
        html : body
    }
    await new Promise((resolve, reject)=>{

        transpoter.sendMail(mailOption,(err,res)=>{
            if(err){
                console.log(err);
                
                reject(err)
            }else{
                console.log(res);
                resolve(res)
            }
        })
    })
}

module.exports = {sendEmail};