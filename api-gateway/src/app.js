require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const proxyRoutes = require('./routes/proxy');
const corsMiddleware = require('./middleware/cors');

const app = express();

/*
Global middleware
*/
app.use(corsMiddleware);
app.use(express.json());

/*
Routes
*/
app.use('/auth', authRoutes);
app.use('/', proxyRoutes);

/*
Start server
*/
app.listen(process.env.PORT, () => {
  console.log(`Gateway running on port ${process.env.PORT}`);
});