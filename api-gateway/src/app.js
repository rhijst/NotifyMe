require('dotenv').config();
const express = require('express');
const client = require('prom-client');
const authRoutes = require('./routes/auth');
const proxyRoutes = require('./routes/proxy');
const corsMiddleware = require('./middleware/cors');

const app = express();
client.collectDefaultMetrics();

/*
Global middleware
*/
app.use(corsMiddleware);

/*
Routes
*/
app.use('/auth', express.json(), authRoutes);
app.use('/', proxyRoutes);
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

/*
Start server
*/
app.listen(process.env.PORT, () => {
  console.log(`Gateway running on port ${process.env.PORT}`);
});