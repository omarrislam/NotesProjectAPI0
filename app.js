const express = require('express')
const app = express()
const port = 3000
const mongoose=require('mongoose')
var cors = require('cors')

 
app.use(cors())
app.use(express.json())
app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/home.routes'))
app.get('/', (req, res) => res.json('Hello World!'))
mongoose.connect('mongodb://localhost:27017/NotesProjectAPI',{useNewUrlParser:true,useUnifiedTopology:true})
app.listen(port, () => console.log(`Example app listening on port port!`))