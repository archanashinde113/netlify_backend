const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Registration endpoint
exports.register = async (req, res) => {
  const { email, password } = req.body;

  // Validate input data
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already registered');
    }

    // Create and save the new user
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).send('User registered');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Internal server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input data
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).send('Invalid email or password');
    }

    console.log('User found:', user);

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    // Logging the comparison values
    console.log('Entered Password:', password);
    console.log('Stored Hashed Password:', user.password);
    console.log('Password Match:', isMatch);

    if (!isMatch) {
      console.log('Password does not match for email:', email);
      return res.status(400).send('Invalid email or password');
    }

    console.log('Password matches');

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('Generated JWT for user:', user.email);

    res.status(200).json({ token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Internal server error');
  }
};

// Protected dashboard endpoint
exports.getDashboard = (req, res) => {
    res.json({ message: `Welcome user ${req.user.userId}` });
};
