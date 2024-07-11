const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projectroute');


const app = express();
app.use(cors());
app.use(express.json());



const connectDB = require('./config/db');

connectDB();


app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
