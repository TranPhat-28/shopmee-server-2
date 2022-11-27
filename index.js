// Import modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// MongoDB connection
const db = process.env.DATABASE_URL;
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('Connected to MongoDB'))
.catch(e => console.log(e.message));



// Setup session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


// App route
const userRouter = require('./routes/allUserRoutes');
app.use('/', userRouter);


// START THE APP
app.listen(process.env.PORT || 5000, console.log('Server started'));