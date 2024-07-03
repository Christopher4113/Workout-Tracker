const userModel = require("./models/User");
const mongoose = require('mongoose');
const cors = require("cors");
const express = require('express');

app.use(cors());


app.post('/workout',(req,res) => {
    userModel.add(req.body)
    .then(user => res.json(user))
    .catch(error => res.json(error));
});



