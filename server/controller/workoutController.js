const userModel = require("./models/User");
const mongoose = require('mongoose');
const cors = require("cors");
const express = require('express');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});




app.post('/workout', async (req,res) => {
    userModel.add(req.body)
    .then(user => res.json(user))
    .catch(error => res.json(error));
});



