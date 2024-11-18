import express from 'express';

import {
    httpHandleRegister,
    httpVerify,
    httpHandleLogin,
} from './login.controller';

const loginRouter = express.Router();

loginRouter.post('/register', httpHandleRegister);
loginRouter.post('/user-login', httpHandleLogin);
loginRouter.post('/verify', httpVerify);

export { loginRouter };
