const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projectroute');


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));
const connectDB = require('./config/db');

connectDB();
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
