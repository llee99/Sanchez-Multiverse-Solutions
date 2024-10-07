const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app=express();

//Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Sanchez Multiverse Solutions API');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});