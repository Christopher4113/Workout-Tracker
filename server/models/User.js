const mongoose = require('mongoose')



const workoutSchema = new mongoose.Schema({
    workout: String,
    sets: Number,
    weights: [Number],
    reps: [Number]
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    workouts: [workoutSchema]
})



const userModel = mongoose.model("users",userSchema)

module.exports = userModel

