require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const searchHistoryRoutes = require('./routes/searchHistory');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/search-history', searchHistoryRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));