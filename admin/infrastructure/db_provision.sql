CREATE TABLE subscriptions (email VARCHAR(256) PRIMARY KEY);

CREATE TABLE users (
  id             SERIAL PRIMARY KEY,
  email          VARCHAR(100) UNIQUE NOT NULL,
  password_hash  VARCHAR(100) NOT NULL
);
