import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { handleFindSpecificUserByKey } from '../models/user/user.model';

async function middlewareAuthenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access token missing or invalid' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }

        const { userId, email } = user as { userId: string; email: string };

        if (!userId || !email) {
            return res.status(403).json({ message: 'Token is not valid' });
        }

        const isUserExisted = await handleFindSpecificUserByKey({ id: userId });
        const isEmailExisted = await handleFindSpecificUserByKey({ email });

        if (!isUserExisted || !isEmailExisted) {
            return res.status(403).json({ message: 'Token is not valid' });
        }

        req.body.user = user;

        next();
    });
}

export { middlewareAuthenticateToken };
