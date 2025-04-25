import cors from 'cors';
import express from 'express';

import challengeRoutes from './routes/challenge-routes.js';
import userRoutes from './routes/user-routes.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api', challengeRoutes);
app.use('/api', userRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
