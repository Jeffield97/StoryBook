const dotenv = require('dotenv').config();
const config = {
    dev: process.env.MODE==="dev",
    port: process.env.PORT || 3000,
    password: process.env.DB_PASS,
    secret: process.env.JWT_PASS,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
 }
 module.exports = config;