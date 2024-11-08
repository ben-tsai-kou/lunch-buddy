import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handleSaveUser({
    email,
    password,
    nickname,
    verificationCode,
}: {
    email: string;
    verificationCode: string;
    password: string;
    nickname: string;
}) {
    const isUserExist = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (isUserExist) {
        throw new Error('User already exist');
    }

    const user = await prisma.user.create({
        data: {
            email,
            verificationCode,
            password,
            nickname,
        },
    });

    return user;
}

export { handleSaveUser };
