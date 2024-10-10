import express from 'express';

import { httpHandleRegister, httpVerify } from './login.controller';

const loginRouter = express.Router();

loginRouter.post('/register', httpHandleRegister);
loginRouter.get('/verify', httpVerify);

export { loginRouter };
