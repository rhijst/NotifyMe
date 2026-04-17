const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

/*
Helper to avoid duplication
*/
const createServiceProxy = (target) =>
    createProxyMiddleware({
        target,
        changeOrigin: true,
        onProxyReq: (proxyReq) => {
            proxyReq.setHeader(
                'x-internal-secret',
                process.env.INTERNAL_SECRET
            );
        },
    });

/*
Protected routes
*/
router.use('/tasks', verifyToken, createServiceProxy(process.env.TASK_SERVICE_URL));
router.use('/users', verifyToken, createServiceProxy(process.env.USER_SERVICE_URL));

module.exports = router;