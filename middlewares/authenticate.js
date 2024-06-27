const jwt =require("jsonwebtoken")

async function checkToken(req,res,next){
    try{
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            
            const decoded = jwt.verify(token, process.env.SECRET);
            req.user=decoded
            next()
        }
        if(!token){
            return res.status(401).send({error_status:true,code:"AUTH_200",message:"Token not found"})
        }
    }catch(error){
        console.log("ERROR checkToken ::",JSON.stringify(error)) 
        return res.status(401).send({error_status:true,code:"AUTH_500"})
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
