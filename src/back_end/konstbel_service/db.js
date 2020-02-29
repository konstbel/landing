
const pgp = require('pg-promise')();

const cn = 'postgres://0.0.0.0:5432/konstbel';
const db = pgp(cn);

module.exports = {
    pgp, db
};