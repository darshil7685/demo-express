const {User}=require('../models/user')
const jwt =require("jsonwebtoken")
const bcrypt=require('bcrypt')
async function userRegister(req,res){
    try{
        console.log("global.a",global.a);
        let { user_name, user_email, user_password,user_mobile_number,user_level } = req.body;
        const userExists = await User.findOne({ $or:[{user_email:user_email},{ user_name:user_name}] });
        if (userExists) {
            return res.status(400).json({error_status:false,code:"USER_REGISTER_200", validation_message: 'User Name or Email already exists' });
        }
        // const salt=await bcrypt.genSalt(10)
        // user_password=await bcrypt.hash(user_password,salt)
        let user = await User.create({ user_name, user_email, user_password,user_mobile_number,user_level });
        
        // let token= await jwt.sign({user_id:user._id,user_name:user_name},'secret_jwt_token',{expiresIn:'1h'})
        console.log("user",user)
        return res.status(200).json({error_status:false,code:"USER_REGISTER_200",data:{user_id:user._id,user_level:user.user_level,user_name:user.user_name}})
    }catch(error){
        console.log("ERROR :: ",JSON.stringify(error))
        return res.status(500).json({error_status:true,code:"INTERNAL_SERVER_ERROR_500"})
    }
}

async function loginUser(req,res){
    try{
        let {user,user_password}=req.body
        const userExists =await User.findOne({$or:[{user_email:user},{user_name:user}]})
        if(!userExists){
            return res.status(200).json({error_status:false,code:"USER_LOGIN_200",validation_message:'User does not exists'})
        }
        const matchPassword =await userExists.validatePassword(user_password)
        // const matchPassword = await bcrypt.compare(user_password,userExists.user_password)
        if(matchPassword){
            let token= await jwt.sign({user_id:userExists._id,user_name:userExists.user_name,user_level:userExists.user_level},process.env.SECRET,{expiresIn:'1h'})
            return res.status(200).json({error_status:false,code:"USER_LOGIN_200",data:{user_id:userExists._id,user_name:userExists.user_name,user_token:token}})
        }else{
            return res.status(200).json({error_status:false,code:"USER_LOGIN_200",validation_message:'User Paswword does not match'})
        }
    }catch(error){
        console.log("ERROR :: ",JSON.stringify(error))
        return res.status(500).json({error_status:true,code:"INTERNAL_SERVER_ERROR_500"})
    }
}

async function getUserList(req,res){
    try{
        console.log("req",req.user);
        const users=await getUsersByUserName(req.body.user_list)
        console.log("SUCCESS getUserList ::");  
        return res.status(200).json({error_status:false,code:"USER_LIST_200",data:users})

    }catch(error){
        console.log("ERROR :: ",JSON.stringify(error))
        return res.status(500).json({error_status:true,code:"INTERNAL_SERVER_ERROR_500"})
    }
}

async function getUsersByUserName(userNames){
    try{
        let users
        if(userNames && userNames.length > 0){
            users = await User.find({$and:[{user_name:{$in:userNames}},{user_level:'user'}]})
        }else{
            users = await User.find({user_level:'user'})
        }
        console.log("SUCESS getUsersByUserName ::")
        return users
    }catch(error){
        console.log("ERROR getUsersByUserName :: ",JSON.stringify(error))
        throw error
    }
}

module.exports={userRegister,loginUser,getUserList}