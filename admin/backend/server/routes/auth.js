import { Router } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { db } from '../db';

const secret = fs.readFileSync('secret');
const router = Router();

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await db.one('SELECT * FROM users WHERE email = $1', email);
    try {
      if (!await argon2.verify(user.password_hash, password)) {
        res.status(403).json({ error: 'Incorrect password.' });
      }

      res.json(
        {
          token: jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3),
              data: { email },
            },
            secret,
          ),
        },
      );
    } catch (err) {
      next(err);
    }
  } catch (e) {
    res.status(403).json({ error: 'User not found.' });
  }
});

export default router;
