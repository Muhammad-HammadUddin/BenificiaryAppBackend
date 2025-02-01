import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from "./routes/User.js"
import Staff from "./routes/Staff.js"
import authRouter from "./routes/auth.js"
const port = process.env.PORT || 3000;
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const connect = () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log('Connected to database');
      console.log("Itni labi kya hai yeh database");
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
// http://localhost:3000/api/auth/login
// https://benificiary-app-backend.vercel.app/

app.options('*', cors());

app.use(cookieParser());
app.use(express.json());


app.use("/api/user",User);

app.use("/api/Staff",Staff)

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
