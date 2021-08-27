const app=require('express').Router()
const noteModel=require('../models/note.models')
const auth=require('../middleware/auth')
var userID
app.get('/home',auth,async(req,res)=>{
    console.log(req.userID);
    let notes=await noteModel.find({userID:req.userID})
    res.json({notes})
})

app.post('/addNote',auth,async(req,res)=>{
    const{title,desc}=req.body
    await noteModel.insertMany({title,desc,userID:req.userID})
    res.json({message:"Note Added"})
})

app.delete('/delete',auth,async(req,res)=>{
    const{noteID}=req.body
    await noteModel.findByIdAndDelete({_id:noteID})
    res.json({message:"deleted"})
})

app.put('/edit',auth,async(req,res)=>{
    const{title,desc,noteID}=req.body
    await noteModel.findByIdAndUpdate({_id:noteID},{title,desc})
    res.json({message:"Updated"})
})
module.exports=app