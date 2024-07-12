const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    date:String,
    workout: String,
    sets: Number,
    weights: [Number],
    reps: [Number]
});

const enduranceSchema = new mongoose.Schema({
    date:String,
    workout: String,
    duration: Number,
    distance: Number
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    workouts: [workoutSchema],
    endurances: [enduranceSchema]
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
