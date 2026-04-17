const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

/*
Login
*/
router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const response = await fetch(
            `${process.env.USER_SERVICE_URL}/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-internal-secret': process.env.INTERNAL_SECRET,
                },
                body: JSON.stringify(req.body),
            }
        );

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
    } catch (err) {
        res.status(500).json({ error: 'Auth service error' });
    }
});

router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        const response = await fetch(
            `${process.env.USER_SERVICE_URL}/auth/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-internal-secret': process.env.INTERNAL_SECRET,
                },
                body: JSON.stringify(req.body),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Auth service error' });
    }
});

module.exports = router;