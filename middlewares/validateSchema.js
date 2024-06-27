const { json } = require("express");
const joi = require("joi");
const { decode } = require("jsonwebtoken");

async function userRegistrationValidation(req,res,next){
    const userSchema =joi.object({
        user_name:joi.string().required().label('User Name'),
        user_email:joi.string().required().label('User Email'),
        user_password:joi.string().required().label('User Password'),
        user_mobile_number:joi.number().integer().required().label('User Mobile Number'),
        user_level:joi.string().valid('user','admin').required().label('User Level')
    })
    validateSchema(userSchema,req,res,next)
    // const {error,value}=userSchema.validate(req.body,{abortEarly:false})
    // if(error){
    //     let validateError=error.details.map((err)=>err.message)
    //     console.log("Error  userRegistrationValidation",JSON.stringify(error));
    //     return res.status(401).send({error_status:true,error:validateError,code:"400"})
    // }else{
    //     console.log("Success userRegistrationValidation")
    //     next()
    // }
}

async function userLoginValidation(req,res,next){
    const userLoginSchema =joi.object({
        user:joi.string().required().label('User'),
        user_password:joi.string().required().label('User Password')
    })
    validateSchema(userLoginSchema,req,res,next)
}

async function userListValidation(req,res,next){
    const userListSchema =joi.object({
        user_list:joi.array().items(joi.string()).optional().label('User List')
    })
    validateSchema(userListSchema,req,res,next)
}

async function validateSchema(schema,req,res,next) {
    const {error,value}=schema.validate(req.body,{abortEarly:false})
    if(error){
        let validateError=error.details.map((err)=>err.message)
        console.log("Error::  userLoginValidation",JSON.stringify(error));
        return res.status(401).send({error_status:true,error:validateError,code:"400"})
    }else{
        console.log("Success:: userLoginValidation")
        next()
    }
}



module.exports={userRegistrationValidation,userLoginValidation,userListValidation}
