const mongoose = require('mongoose');
const databaseURL = "mongodb://localhost:27017/mynotebook";

const connect = ()=>{
    mongoose.connect(databaseURL,()=>{
        console.log("mongodb connected!");
    })
}

module.exports = connect;