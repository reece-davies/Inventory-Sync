require("dotenv").config()
const express = require("express")
const inventItemRoutes = require("./routes/inventItemRoutes.js")

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes (test API)
/*
app.get("/", (req, res) => {
    res.json({message: "Welcome to the apps"})
    //res.send("hello") // outputs text
}) */

// routes (with Router)
app.use("api/inventitems", inventItemRoutes)

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("listening on port 4000")
})

//process.env