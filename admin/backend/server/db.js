import pgPromise from 'pg-promise';

const initOptions = {};
const cn = process.env.DATABASE_URL;
export const pgp = pgPromise(initOptions);
export const db = pgp(cn);
