const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({

service:"gmail",

auth:{
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS
}

});

exports.sendCertificate = async (email,file)=>{

await transporter.sendMail({

from:"Takshashila University",
to:email,
subject:"Your Certificate",
text:"Your certificate is attached",
attachments:[
{
filename:"certificate.pdf",
path:file
}
]

});

};