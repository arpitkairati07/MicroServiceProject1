import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './route.js'
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/v1",userRoutes);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "MusicApp",
    });
    console.log('Connection with database is successful');
  } catch (error) {
    console.log("DB connection error:", error);
  }
};

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
});
