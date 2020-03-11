import pgPromise from 'pg-promise';

const initOptions = {};
const cn = 'postgres://0.0.0.0:5432/konstbel';

export const pgp = pgPromise(initOptions);
export const db = pgp(cn);
