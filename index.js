import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';  // You can remove this if you're not using environment variables
import User from "./routes/User.js"
import Staff from "./routes/Staff.js"
import authRouter from "./routes/auth.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();  // Remove this if you're not using .env files anymore

const port = process.env.PORT || 3000;


const connect = () => {
  mongoose.connect("mongodb+srv://hammaduddin083:1234567890@saylanihackathon.zt6fu.mongodb.net/") 
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.log('Error connecting to database', err);
    });
};

connect();

const app = express();

app.use(cors({
  origin: 'https://hackathon-frontendd.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.options('*', cors());

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", User);
app.use("/api/Staff", Staff);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
