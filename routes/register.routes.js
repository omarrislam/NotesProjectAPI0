const app=require('express').Router()
const userModel=require('../models/user.models')
const validation=require('../validation/register.validation')
const bcrypt=require('bcrypt')
const { validationResult } = require('express-validator');
app.post('/handleRegister',validation,async(req,res)=>{
    const {name,email,password}=req.body
    let errors=validationResult(req)
try {
    if(errors.isEmpty()){
        let user=await userModel.findOne({email})
        if(user){
            res.json({message:'Account already exist',oldInputs:{name,email,password}})
        }else{
            bcrypt.hash(password,7,async(err,hash)=>{
                if(err){
                    res.json({message:'hash error',err})
                }else{
                    await userModel.insertMany({name,email,password:hash})
                }
            })
            res.json({message:'Registered successfully'})
        }
    }else{
        res.json({message:'Enter valid data',messageError:errors.errors,oldInputs:{name,email,password}})
    }
} catch (error) {
    res.json({message:'Catch register error',error})
}

})
module.exports=app