import nodemailer from 'nodemailer';
import User from "@/models/userModels";
import bcrypt from "bcryptjs";

export const sendEmail = async({toEmailId, emailtype, userId}: any) => {
   try {
    
   const hashedToken =await bcrypt.hash(userId.toString(), 10);

   if (emailtype === "VERIFYUSER"){
    await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken, 
        verifyTokenExpires: Date.now() + 3600000
        });
   }else if (emailtype === "FORGOTPASSWORD"){
    await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken, 
        forgotPasswordTokenExpires: Date.now() + 3600000
        });
   }

   const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "595ed75d61a9ff",
      pass: "f6eba773650c78"
    }
  });

  const mailOptions = {
    from: '"Manivel Auth App" <manivelgit@gmail.com>',
    to: toEmailId,
    subject: emailtype === "VERIFYUSER" ? "Verify yourself" : "Reset your Password" ,
    html: `<b>Hello there?</b> <p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">Here to ${emailtype === "VERIFYUSER" ? "Verify yourself." : "Reset your Password."}  </a></p>`
  }
   
 const mailresponse = await transport.sendMail(mailOptions);
 return mailresponse;
    
   } catch (error: any) {
        throw new Error(error);
   } 

}