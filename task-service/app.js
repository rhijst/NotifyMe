const express = require('express');
const connectDB = require('./config/db');
const { connectRabbit } = require('./config/rabbit');
require('dotenv').config();

connectDB();
connectRabbit();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

// Alleen gateway mag praten
app.use((req, res, next) => {
  if (req.headers['x-internal-secret'] !== process.env.INTERNAL_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

app.use('/tasks', taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Task service running on port ${process.env.PORT}`);
});