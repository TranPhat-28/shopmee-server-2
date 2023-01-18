// Import modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// MongoDB connection
const db = process.env.DATABASE_URL;
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('Connected to MongoDB'))
.catch(e => console.log(e.message));


// App route
const userRouter = require('./routes/allUserRoutes');
app.use('/', userRouter);
const adminRouter = require('./routes/allAdminRoutes');
app.use('/admin', adminRouter);


// START THE APP
app.listen(process.env.PORT || 5000, console.log('Server started'));