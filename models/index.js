//set up mongoose connection
const mongoose = require('mongoose')

// Mongo Connection String
mongoose.connect('mongodb://127.0.0.1:27017/mongoosepractice',{
    useFindAndModify: false
})

// shortcut to mongoose.connection object
const db = mongoose.connection

// set up an event listener to fire once when the connection 'opens' to console log what host and port it is running on
db.once('open', ()=>{
    console.log(`Connected to MongoDb at ${db.host}:${db.port}`)
})

// set up an event listener to fire once when the connection 'opens' to console log what host and port it is running on
db.on('error', (err)=>{
    console.error(`Database error:\n${err}`)
})

// Export all the things
module.exports.Bounty = require('./bounty')



