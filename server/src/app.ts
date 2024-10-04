import { api } from './routes/api';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.use('/api', api);

export default app;
