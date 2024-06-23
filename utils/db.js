const mongoose = require('mongoose')

const url = process.env.MONGODBURL

const connectDb = async () => {
    try{
        await mongoose.connect(url)
        console.log("Databas Connected")
    }catch(err){
        console.log("Database Connection Failed");
        console.log(err)
        process.exit(0)
    }
}

module.exports = connectDb
