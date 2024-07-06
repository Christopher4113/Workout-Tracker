const userModel = require("./models/User");
const express = require('express');
const router = express.Router();

router.post('/workout', async (req,res) => {
    userModel.add(req.body)
    .then(user => res.json(user))
    .catch(error => res.json(error));
});

module.exports = router;

