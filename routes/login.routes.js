const app=require('express').Router()
const userModel=require('../models/user.models')
const bcrypt=require('bcrypt')
const validation=require('../validation/login.validation')
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
app.post('/handleLogin',validation,async(req,res)=>{
    const{email,password}=req.body
    let errors=validationResult(req)
try {
    if(errors.isEmpty()){
        let user=await userModel.findOne({email})
        if(user){
            let match=await bcrypt.compare(password,user.password)
            if(match){
                var token = jwt.sign({ name:user.name,isLoggedIn:true,userID:user._id }, 'omar');
                res.json({message:'Logged in successfully',token})
            }else{
            res.json({message:'Incorrect password',oldInputs:{email,password}})
            }
        }else{
            res.json({message:'Account doesnt exist',oldInputs:{email,password}})
        }
    }else{
        res.json({message:'Enter valid data',messageError:errors.errors,oldInputs:{email,password}})
    }
} catch (error) {
    res.json({message:'Error catch login',error})
    
}
})
module.exports=app