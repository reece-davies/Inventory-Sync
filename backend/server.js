require('dotenv').config()

const express = require('express')
const inventoryRoutes = require('./routes/inventoryRoutes')
const mongoose = require('mongoose')

// express app
const app = express()

// middleware
app.use(express.json()) // prepare us for later (use of middleware)

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes (test local API)
/*
app.get("/", (req, res) => {
    res.json({message: "Welcome to the apps"})
    //res.send("hello") // outputs text
}) */

// routes (with Router)
app.use('/api/inventory', inventoryRoutes)

// connnect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
    console.log("connected to db & listening on port 4000")
})
})
.catch((error) => {
    console.log(error)
})


//process.env