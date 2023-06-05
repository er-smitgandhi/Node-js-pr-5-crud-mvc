const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/PR-5-crud-mvc')

const db = mongoose.connection;

db.on('err',console.error.bind(console,"DB not connected"));

db.on("connected",(err)=>{
    if(err){
        console.log(err);
    }
    console.log("Db is connected");
})

module.exports = db;