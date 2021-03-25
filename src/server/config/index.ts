

export default require(`./${process.env.NODE_ENV}`).default

// dotenv.config();



// export default {
//     mysql: {
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         host: process.env.DB_HOST,
//         database: process.env.DB_SCHEMA     
//     }
// }