const customError=require('./customError')

class Unautorized extends customError {
    constructor(message,statusCode,status) {
        super(statusCode, message);
        this.status = status
    }
}

class InternalServerError extends customError {
    constructor() {
        super(500,'Internal Server Error:Something went wrong');
        this.status = 'ERROR'
    }
}

module.exports={Unautorized,InternalServerError}