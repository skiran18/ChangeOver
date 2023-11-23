const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('Hello')
})

// app.use('/api/v1/buy')
module.exports = app