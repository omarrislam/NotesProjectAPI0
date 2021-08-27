var jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    var token=req.header('token')
try {
    jwt.verify(token, 'omar', function(err, decoded) {
        if(err){
            res.json({message:'Invalid Token'})
        }else{
            if(decoded.isLoggedIn){
                req.name=decoded.name,
                req.userID=decoded.userID
                next()
            }else{
            res.json({message:'Please Login First'})
            }
        }
      });
} catch (error) {
    res.json({message:'catch auth error',error})
}
}