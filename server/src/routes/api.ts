import express from 'express';

import { loginRouter } from './login/login.router';

const api = express.Router();

api.use('/login', loginRouter);

export { api };
