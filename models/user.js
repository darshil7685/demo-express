const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const Schema=mongoose.Schema;

const userSchema=new Schema({
    user_id:Schema.Types.ObjectId,
    user_name :String,
    user_email:String,
    user_password:String,
    user_mobile_number:Number,
    user_level:{type:String,enum:['user','admin'],default:'user'}
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('user_password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.user_password = await bcrypt.hash(this.user_password, salt);
    next();
});

userSchema.methods.validatePassword=async function(password){
    return await bcrypt.compare(password,this.user_password)
}
const User=mongoose.model("User",userSchema)

module.exports={User}