import pgPromise from 'pg-promise';

const initOptions = {};
export const pgp  = pgPromise(initOptions);
export const db   = pgp({
    host    : process.env.DATABASE_HOST,
    user    : process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});
