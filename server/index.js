const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path'); // Add this line
const userModel = require("./models/User");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const workoutRouter = require('./controller/workoutController');
const enduranceRouter = require('./controller/enduranceController');
const calorieRouter = require('./controller/calorieController');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY || "your_default_secret_key";

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
    return res.json({ error: "Email and password are required" });
  }
  userModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
              res.json({ message: "Success", token: token });
            } else {
              res.json({ error: "The password was incorrect" });
            }
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ error: "An error occurred. Please try again." });
          });
      } else {
        res.json({ error: "No email was registered" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "An error occurred. Please try again." });
    });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  userModel.findOne({ name: name })
    .then(user => {
      if (user) {
        return res.json({ error: "Username already taken" });
      } else {
        userModel.findOne({ email: email })
          .then(user => {
            if (user) {
              return res.json({ error: "Email already registered" });
            } else {
              bcrypt.hash(password, 10)
                .then(hashedPassword => {
                  userModel.create({ name, email, password: hashedPassword })
                    .then(newUser => res.json(newUser))
                    .catch(error => res.json(error));
                })
                .catch(error => res.json(error));
            }
          })
          .catch(error => res.json(error));
      }
    })
    .catch(error => res.json(error));
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

app.use('/workout', authenticateToken, workoutRouter);
app.use('/endurance', authenticateToken, enduranceRouter);
app.use('/calorie', authenticateToken, calorieRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
