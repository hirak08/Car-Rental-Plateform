const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function connectDB(){
    // MongoDB connection string with database name
    const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/carrental";
    
    mongoose.connect(mongoURI, {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    })

    const connection = mongoose.connection

    connection.on('connected', ()=>{
        console.log('MongoDB Connection Successful - Database: carrental')
    })

    connection.on('error', (error)=>{
        console.log('MongoDB Connection Error:', error.message)
    })

    connection.on('disconnected', ()=>{
        console.log('MongoDB Disconnected')
    })

    // Handle app termination
    process.on('SIGINT', async () => {
        await connection.close();
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    });
}

connectDB()

module.exports = mongoose