import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import {
    handleIsEmailDomainValid,
    generateVerificationCode,
} from '../../helper/login/login.helper';
import { handleSaveUser } from '../../models/user/user.model';

dotenv.config();

const VALID_DOMAINS = 'idealump.com';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER || '',
        pass: process.env.GMAIL_PASS || '',
    },
});

async function httpHandleRegister(
    req: Request,
    res: Response
): Promise<Response> {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        return res.status(500).send('system error');
    }

    const { email } = req.body;

    if (!email) {
        return res.status(500).send('Email is required');
    }

    if (!handleIsEmailDomainValid({ email, validDomains: VALID_DOMAINS })) {
        return res.status(500).send('Email domain not allowed');
    }

    const verificationCode = generateVerificationCode();

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'main subject',
        text: verificationCode,
    };

    try {
        await transporter.verify();
        await transporter.sendMail(mailOptions);
        await handleSaveUser({ email, verificationCode });
        return res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Error sending verification email' });
    }
}

function httpVerify(req: Request, res: Response): void {}

export { httpHandleRegister, httpVerify };
