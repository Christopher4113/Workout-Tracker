const userModel = require("../models/User");
const express = require('express');
const router = express.Router();

// Add new Calories
router.post('/', async (req, res) => {
    const userId = req.user.userId; // The user ID should be extracted from the JWT token
    const { date, calorie} = req.body.formData;
    
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    
      const newCalorie = {
        date,
        calorie
      };
    
      user.calories.push(newCalorie);
      await user.save();
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
  });
  
 //get calorie info
  router.get('/', async (req, res) => {
    const userId = req.user.userId; // Extract the user ID from the JWT token
    
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.calories); 
    } catch (error) {
      res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
  });
  
//get Calorie info for updating
  router.get('/getCalorie/:id', async (req, res) => {
    const userId = req.user.userId; // Extract the user ID from the JWT token
    const workoutId = req.params.id;
  
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const calorie = user.calories.id(workoutId);
      if (!calorie) {
        return res.status(404).json({ error: 'Calories not found' });
      }
  
      res.json(calorie);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
  });
  
 //update calorie info
  router.put('/updateCalorie/:id', async (req, res) => {
    const userId = req.user.userId; // Extract the user ID from the JWT token
    const calorieId = req.params.id;
    const { date, calorie } = req.body.formData;
  
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const calorieToUpdate = user.calories.id(calorieId);
      if (!calorieToUpdate) {
        return res.status(404).json({ error: 'Calories not found' });
      }
  
      calorieToUpdate.date = date;
      calorieToUpdate.calorie = calorie;

  
      await user.save();
      res.json({ message: 'Workout updated successfully', calorie: calorieToUpdate });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
  });
  
 //delete calorie info
  router.delete('/deleteCalorie/:id', async (req, res) => {
    const userId = req.user.userId; // Extract the user ID from the JWT token
    const calorieId = req.params.id;
  
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const calorieIndex = user.calories.findIndex(calorie => calorie._id.toString() === calorieId);
      if (calorieIndex === -1) {
        return res.status(404).json({ error: 'Calories not found' });
      }
  
      user.calories.splice(calorieIndex, 1);
      await user.save();
  
      res.json({ message: 'Calories deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
  });

module.exports = router;