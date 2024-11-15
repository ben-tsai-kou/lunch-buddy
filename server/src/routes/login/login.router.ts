import express from 'express';

import { httpHandleRegister, httpVerify } from './login.controller';

const loginRouter = express.Router();

loginRouter.post('/register', httpHandleRegister);
loginRouter.post('/verify', httpVerify);

export { loginRouter };
