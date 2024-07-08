const express = require('express');
const router = express.Router();
const userModel = require("../models/User");

router.post('/', async (req, res) => {
  const userId = req.user.userId; // The user ID should be extracted from the JWT token
  const { workout, sets, weights, reps } = req.body.formData;

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

    res.json({ workout: newWorkout });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

router.get('/', async (req, res) => {
  const userId = req.user.userId; // The user ID should be extracted from the JWT token

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ workouts: user.workouts });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

router.put('/:workoutId', async (req, res) => {
  const userId = req.user.userId; // The user ID should be extracted from the JWT token
  const workoutId = req.params.workoutId;
  const { workout, sets, weights, reps } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const workoutToUpdate = user.workouts.id(workoutId);
    if (!workoutToUpdate) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    workoutToUpdate.workout = workout;
    workoutToUpdate.sets = sets;
    workoutToUpdate.weights = weights;
    workoutToUpdate.reps = reps;

    await user.save();
    res.json({ workout: workoutToUpdate });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

router.delete('/:workoutId', async (req, res) => {
  const userId = req.user.userId; // The user ID should be extracted from the JWT token
  const workoutId = req.params.workoutId;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const workoutToDelete = user.workouts.id(workoutId);
    if (!workoutToDelete) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    workoutToDelete.remove();
    await user.save();
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

module.exports = router;
