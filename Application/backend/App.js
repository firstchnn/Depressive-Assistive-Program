const express = require('express');
const mongoose = require('mongoose');

const options = {};
mongoose.connect('mongodb+srv://chnw-admin:5wtxlgWw6E0s8l8g@application.boctkj3.mongodb.net/test')


const app = express();
const PORT = 3000;  





app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);