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

// MongoDB direct connection string
const connect = () => {
  mongoose.connect(process.env.MONGO_URI)  // Direct Mongo URI
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
  origin: '*',
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
