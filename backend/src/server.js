import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Updated CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use('/api', contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});