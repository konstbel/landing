import jwt from 'jsonwebtoken';
import fs from 'fs';

const secret = fs.readFileSync('./secret');

const isAuthorized = (authJwt) => {
  try {
    const [, token] = authJwt.split(' ');
    jwt.verify(token, secret);
    return true;
  } catch (e) {
    return false;
  }
};

const authorize = (req, res, next) => {
  const token = req.headers.authorization;

  if (isAuthorized(token)) {
    next();
  } else {
    res.status(401).send({ error: 'Anauthorized' });
  }
};

export default authorize;
