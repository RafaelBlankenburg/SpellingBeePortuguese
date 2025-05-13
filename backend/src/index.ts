import cors from 'cors';
import express from 'express';

import challengeRoutes from './routes/challenge-routes.js';
import userRoutes from './routes/user-routes.js';
import userWordRoutes from './routes/userword-routes.js';
import userScoreRoutes from './routes/userscore-routes.js';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:8081'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api', challengeRoutes);
app.use('/api', userRoutes);
app.use('/api', userWordRoutes);
app.use('/api', userScoreRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
