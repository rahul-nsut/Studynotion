const mongoose =require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expire:5*60,
    }
});


//function to send emails->
async function sendVerificationEmail(email,otp){
    try {
        const mailresponse= await mailSender(email,"Verify your Email||Study Notion",otp)
        console.log("Email is sent successfully",mailresponse);

    } catch (error) {
        console.log( "error occured while sending the email", error);
        throw error;
    }
}


OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})


module.exports=mongoose.model("OTP",OTPSchema);
