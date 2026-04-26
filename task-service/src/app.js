const express = require('express');
const client = require('prom-client');
const connectDB = require('./config/db');
const { connectRabbit } = require('./config/rabbit');
require('dotenv').config();

connectDB();
connectRabbit();

client.collectDefaultMetrics();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

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