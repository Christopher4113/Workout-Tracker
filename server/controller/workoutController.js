const userModel = require("../models/User");
const express = require('express');
const router = express.Router();

// Add new workout
router.post('/', async (req, res) => {
  const userId = req.user.userId; // The user ID should be extracted from the JWT token
  const { date, workout, sets, weights, reps } = req.body.formData;
  
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    const newWorkout = {
      date,
      workout,
      sets,
      weights,
      reps
    };
  
    user.workouts.push(newWorkout);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

// Get all workouts
router.get('/', async (req, res) => {
  const userId = req.user.userId; // Extract the user ID from the JWT token
  
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.workouts); // Return only the workouts of the authenticated user
  } catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

// Get a specific workout
router.get('/getWorkout/:id', async (req, res) => {
  const userId = req.user.userId; // Extract the user ID from the JWT token
  const workoutId = req.params.id;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const workout = user.workouts.id(workoutId);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

// Update a specific workout
router.put('/updateWorkout/:id', async (req, res) => {
  const userId = req.user.userId; // Extract the user ID from the JWT token
  const workoutId = req.params.id;
  const { date, workout, sets, weights, reps } = req.body.formData;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const workoutToUpdate = user.workouts.id(workoutId);
    if (!workoutToUpdate) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    workoutToUpdate.date = date;
    workoutToUpdate.workout = workout;
    workoutToUpdate.sets = sets;
    workoutToUpdate.weights = weights;
    workoutToUpdate.reps = reps;

    await user.save();
    res.json({ message: 'Workout updated successfully', workout: workoutToUpdate });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

// Delete a specific workout
router.delete('/deleteWorkout/:id', async (req, res) => {
  const userId = req.user.userId; // Extract the user ID from the JWT token
  const workoutId = req.params.id;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const workoutIndex = user.workouts.findIndex(workout => workout._id.toString() === workoutId);
    if (workoutIndex === -1) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    user.workouts.splice(workoutIndex, 1);
    await user.save();

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

module.exports = router;
