require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

//<<<<FORM DATA MIDDLEWARE>>>>
// More here: https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded/51844327#:~:text=a.-,express.,use(express.
// allows form data to be processed into req.body
app.use(express.urlencoded({extended: false}))
// tells express to recognize req.body as a json object
app.use(express.json())
app.use(cors())


// Include the controller
app.use('/bounties', require('./controllers/bounties'))

// GET /
app.get('/', (req, res)=> {
  res.send('You\'ve hit the home route of the Mongo Bounty Hunter server!')
})

app.listen(process.env.PORT || 8000, ()=>{
  console.log(`☕️ You're listening to the smooth sounds of port ${process.env.PORT || 8000}`)
})