const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const http = require('http');
const mongoDB = 'mongodb+srv://chnw-admin:5wtxlgWw6E0s8l8g@application.boctkj3.mongodb.net/test';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true },(err) => {
    if(!err){
        console.log('connect to db')
    }else{
        console.log('cannot connect to db',err)
    }
})
const db = mongoose.connection;
const app = express();
const PORT = 3000;  
app.use(cors());
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const Schema = mongoose.Schema;
const doctorSchema = new Schema({
    name : String,
    tel : String,
    workplace : String,
    expertise : String,
    // educational : Object,
    ovr_rating : String,
    consultantNumber : String,
    // profile_picture : Buffer,
    // review : Object,
});
const Doctors = mongoose.model("Doctors",doctorSchema);

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

app.get("/all-doctor", (req, res) => {
    console.log('Getting alldoctor');
    Doctors.find((err,val) => {
        if(err){
            console.log(err);
        }else{
            console.log(val);
            res.json(val);
        }
    })
})