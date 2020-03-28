#!/usr/bin/env node

import argon2 from 'argon2';
import { db } from '../db';

async function insertUser(email, password) {
  try {
    const passHash = await argon2.hash(password);
    await db.none('INSERT INTO users(email, password_hash) VALUES($1, $2)', [email, passHash]);
    console.log('Successfuly added user to the system.');
  } catch (e) {
    console.error(e);
  }
  process.exit();
}

const [email, password] = process.argv.slice(2);

insertUser(email, password);
