const express=require("express")
const {userRegister,loginUser,getUserList}=require("../controllers/usercontroller")
const router = express.Router()
const {userRegistrationValidation,userLoginValidation,userListValidation}=require("../middlewares/validateSchema")
const {checkToken,isAdmin}=require("../middlewares/authenticate")

router.post('/register',userRegistrationValidation,userRegister)
router.post('/login',userLoginValidation,loginUser)
router.post('/userList',checkToken,isAdmin,userListValidation,getUserList)


module.exports=router