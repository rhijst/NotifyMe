const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

/*
CORS
*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

/*
JWT middleware
*/
function verifyToken(req, res, next) {
  if (req.path === '/auth/login') return next();

  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.headers['x-user-id'] = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.use(express.json());
app.use(verifyToken);

/*
Login
*/
app.post('/auth/login', async (req, res) => {
  const response = await fetch(`${process.env.USER_SERVICE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-secret': process.env.INTERNAL_SECRET,
    },
    body: JSON.stringify(req.body),
  });

  if (!response.ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const user = await response.json();

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

/*
TASK SERVICE
*/
app.use(
  '/tasks',
  createProxyMiddleware({
    target: process.env.TASK_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/tasks': '' },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('x-internal-secret', process.env.INTERNAL_SECRET);
    },
  })
);

/*
USER SERVICE
*/
app.use(
  '/users',
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/users': '' },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('x-internal-secret', process.env.INTERNAL_SECRET);
    },
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Gateway running on port ${process.env.PORT}`);
});