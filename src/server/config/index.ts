import * as dotenv from 'dotenv';
//dotenv is utilized to keep the 'blogs' table user info private
dotenv.config();

export default {
    mysql: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_SCHEMA     
    }
}