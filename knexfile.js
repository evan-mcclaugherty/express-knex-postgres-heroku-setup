require('dotenv').load();

module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/YOUR-DB- NAME-HERE'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
    }
};
