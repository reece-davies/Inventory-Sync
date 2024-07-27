require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const inventoryRoutes = require('./routes/inventoryRoutes')
const groupRoutes = require('./routes/groupRoutes')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require("cookie-parser");
const cors = require("cors"); // cross origin resource sharing

// express app
const app = express()

// middleware
app.use(express.json()) // prepare us for later (use of middleware)
app.use(cookieParser()); // cookies!

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://your-production-frontend-url.com' : 'http://localhost:4000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to handle cookies
}

app.use(cors(corsOptions));



// routes (test local API)
/*
app.get("/", (req, res) => {
    res.json({message: "Welcome to the apps"})
    //res.send("hello") // outputs text
}) */

// routes (with Router)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/groups', groupRoutes)
app.use('/api/user', userRoutes)

// connnect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");

    // Start server
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process with failure
});




// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


//process.env