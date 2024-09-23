import path from 'path';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

export default app;
