const nodemailer = require("nodemailer")
const aws = require("aws-sdk")
const config = require("../../config")
config.aws.region = "us-east-1"

const transporter = nodemailer.createTransport({
    SES: new aws.SES(config.aws)
});

// send some mail
transporter.sendMail({
    from: 'support@chratos.io',
    to: 'nhinrichs@gmail.com',
    subject: 'SES TEST',
    text: 'I hope this message gets sent!',
    
}, (err, info) => {
	if(err) return console.log(err)
    console.log(info.envelope);
    console.log(info.messageId);
});