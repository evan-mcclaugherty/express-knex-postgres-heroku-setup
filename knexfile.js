require('dotenv').load();

module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/into_to_knex'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
    }
};
