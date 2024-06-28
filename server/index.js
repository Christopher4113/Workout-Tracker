const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const userModel = require("./models/User");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Log the environment variable to check if it's being loaded
console.log('MongoDB URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json("Email and password are required");
    }

    userModel.findOne({ email: email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("The password was incorrect");
            }
        } else {
            res.json("No email was registered");
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json("An error occurred. Please try again.");
    });
});
app.post('/register', (req, res) => {
    userModel.create(req.body)
    .then(user => res.json(user))
    .catch(error => res.json(error));
});

app.listen(3001, () => {
    console.log("Server is running");
});
