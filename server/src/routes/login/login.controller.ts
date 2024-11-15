import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';

import {
    handleIsEmailDomainValid,
    generateVerificationCode,
    validationUserInput,
} from '../../helper/login/login.helper';
import {
    handleFindSpecificUserByKey,
    handleSaveUser,
    handleUpdateUser,
} from '../../models/user/user.model';

dotenv.config();

const VALID_DOMAINS = 'idealump.com';

const { GMAIL_USER, GMAIL_PASS } = process.env;

if (!GMAIL_USER || !GMAIL_PASS) {
    throw new Error('GMAIL_USER or GMAIL_PASS not found');
}

const LoginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

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

async function httpHandleLogin(
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
): Promise<Response> {
    const result = LoginSchema.safeParse(req.body);
    if (!result.success) {
        return res
            .status(400)
            .json({ message: 'Invalid input', errors: result.error.errors });
    }
    const { email, password } = req.body;

    const user = await handleFindSpecificUserByKey({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'success' });
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
            .json({ message: 'Verification email sent', userEmail: email });
    } catch (error) {
        if (error === 'User already exist') {
            return res.status(409).json({ message: 'User already exist' });
        }
        return res
            .status(500)
            .json({ message: 'Error sending verification email' });
    }
}

async function httpVerify(
    req: Request<{}, {}, { email: string; verificationCode: string }>,
    res: Response
): Promise<Response> {
    try {
        const user = await handleFindSpecificUserByKey({
            email: req.body.email,
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.verificationCode !== req.body.verificationCode) {
            return res
                .status(500)
                .json({ message: 'Verification code not match' });
        }

        await handleUpdateUser({
            where: { email: user.email },
            data: {
                email: user.email,
                nickname: user.nickname,
                password: user.password,
                verificationCode: '',
            },
            isUpdateVerificationCode: true,
        });

        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

export { httpHandleRegister, httpVerify, httpHandleLogin };
