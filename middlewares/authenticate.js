const jwt =require("jsonwebtoken")
const {Unautorized,InternalServerError} = require("../utils/instancesCE")

async function checkToken(req,res,next){
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            
            jwt.verify(token, process.env.SECRET,(err,decoded)=>{
                if(err) {
                    console.log("err",err);
                    return next( new Unautorized('Token expired',401,'fail'))
                }
                req.user=decoded
                next()
            });
        }
        if(!token){
            // return res.status(401).send({error_status:true,code:"AUTH_200",message:"Token not found"})
            return next(new Unautorized('Token not found"',401,'error'))
        }
        
}

async function isAdmin(req,res,next){
    if(req.user && req.user.user_level == 'admin'){
        next()
    }else{
        res.status(401).json({error_status:true, error: 'Not authorized as an admin' });
    }
}

module.exports={ checkToken,isAdmin}
