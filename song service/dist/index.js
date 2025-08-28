import express from 'express';
import dotenv from 'dotenv';
import songRoutes from './route.js';
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
const app = express();
app.use(cors());
app.use("/api/v1", songRoutes);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
});
//# sourceMappingURL=index.js.map