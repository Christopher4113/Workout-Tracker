const userModel = require("../models/User");
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { workout, sets, weights, reps } = req.body.formData;
    const userId = req.user.userId; // The user ID should be extracted from the JWT token
  
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const newWorkout = {
        workout,
        sets,
        weights,
        reps
      };
  
      user.workouts.push(newWorkout);
      await user.save();

      //check if database update
      console.log(user);
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
  });
  
  module.exports = router;
