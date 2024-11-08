import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';

import {
    handleIsEmailDomainValid,
    generateVerificationCode,
    validationUserInput,
} from '../../helper/login/login.helper';
import { handleSaveUser } from '../../models/user/user.model';

dotenv.config();

const VALID_DOMAINS = 'idealump.com';

const { GMAIL_USER, GMAIL_PASS } = process.env;

if (!GMAIL_USER || !GMAIL_PASS) {
    throw new Error('GMAIL_USER or GMAIL_PASS not found');
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
    },
});

async function handleSendVerificationEmail({
    email,
    verificationCode,
}: {
    email: string;
    verificationCode: string;
}) {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'main subject',
        text: verificationCode,
    };

    await transporter.verify();
    await transporter.sendMail(mailOptions);
}

async function httpHandleRegister(
    req: Request<{}, {}, { email: string; nickname: string; password: string }>,
    res: Response
): Promise<Response> {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        return res.status(500).json({ message: 'system error' });
    }

    const { email, nickname, password } = req.body;

    const validationMessage = validationUserInput({
        email,
        nickname,
        password,
    });

    if (validationMessage) {
        return res.status(500).json({ message: validationMessage });
    }

    if (!handleIsEmailDomainValid({ email, validDomains: VALID_DOMAINS })) {
        return res.status(500).json({ message: 'Email domain not allowed' });
    }

    const verificationCode = generateVerificationCode();

    const hashPassword = await bcryptjs.hash(password, 10);

    try {
        await handleSendVerificationEmail({ email, verificationCode });
        await handleSaveUser({
            email,
            verificationCode,
            nickname,
            password: hashPassword,
        });
        return res
            .status(200)
            .json({ message: 'Verification email sent', userMail: email });
    } catch (error) {
        if (error === 'User already exist') {
            return res.status(409).json({ message: 'User already exist' });
        }
        return res
            .status(500)
            .json({ message: 'Error sending verification email' });
    }
}

async function httpVerify(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'test' });
}

export { httpHandleRegister, httpVerify };
