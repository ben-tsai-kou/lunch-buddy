import express from 'express';

import { httpSendingVerification, httpVerify } from './login.controller';

const loginRouter = express.Router();

loginRouter.post('/send-verification', httpSendingVerification);
loginRouter.get('/verify', httpVerify);

export { loginRouter };
