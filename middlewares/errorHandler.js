const customError=require('../utils/customError')

function errorHandler(error,req,res,next){
    console.log("-------");
    if(error instanceof customError){
    // if(error){
        console.log("EXIT errorHandler ::",error);
        return res.status(500).send(error)
    }else{
        console.log("EXIT errorHandler ::");
        return res.status(500).send({message:"Something went wrong",status_code:"500"})
    }
}

module.exports={errorHandler}
