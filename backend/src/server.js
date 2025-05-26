import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import wordRoute from './routes/word.routes.js';
import {connectDB} from './lib/db.js';

const port = process.env.PORT || 5002;

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://sign-language-dictionary-eight.vercel.app'
  ], // Adjust this to your frontend URL
  credentials: true
}));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
    connectDB();
});

app.use("/api/words", wordRoute);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

