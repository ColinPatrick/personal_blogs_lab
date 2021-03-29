import * as dotenv from 'dotenv';
// mysql user info hidden using dotenv
export default {
    mysql: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_SCHEMA
    },
    auth: {
        secret: process.env.SECRET
    }
}