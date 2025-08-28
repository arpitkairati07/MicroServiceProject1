import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';
import adminRoutes from './route.js';
import cloudinary from 'cloudinary';
import redis from 'redis';
import cors from 'cors';
dotenv.config();
export const redisClient = redis.createClient({
    password: process.env.Redis_password,
    socket: {
        host: "redis-12487.c44.us-east-1-2.ec2.redns.redis-cloud.com",
        port: 12487 // in connection string after colon
    }
});
redisClient.connect().then(() => {
    console.log("Redis is connected");
}).catch((err) => {
    console.log("Redis Error", err);
});
cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api_Key,
    api_secret: process.env.Cloud_Api_Secret
});
// console.log('Cloudinary config:', cloudinary.v2.config());
const app = express();
app.use(express.json());
app.use(cors());
async function initDB() {
    try {
        await sql `
        CREATE TABLE IF NOT EXISTS albums(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        await sql `
        CREATE TABLE IF NOT EXISTS songs(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255),
            audio VARCHAR(255) NOT NULL,
            album_id INT REFERENCES albums(id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        console.log("✅ Tables created successfully");
    }
    catch (error) {
        console.error("❌ Error creating tables:", error);
    }
}
app.use("/api/v1", adminRoutes);
const port = process.env.PORT || 7000;
initDB().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`);
    });
});
//# sourceMappingURL=index.js.map