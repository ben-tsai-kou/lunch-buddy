import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handleFindSpecificUserByKey(where: Prisma.UserWhereUniqueInput) {
    const user = await prisma.user.findUnique({
        where,
    });
    return user || null;
}

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
    const isUserExist = await handleFindSpecificUserByKey({ email });

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

async function handleUpdateUser({
    where,
    data,
    isUpdateVerificationCode = false,
}: {
    where: Prisma.UserWhereUniqueInput;
    data: {
        email: string;
        password: string;
        nickname: string;
        verificationCode: string;
    };
    isUpdateVerificationCode?: boolean;
}) {
    const isUserExist = await handleFindSpecificUserByKey(where);
    if (!isUserExist) {
        throw new Error('User not found');
    }

    const user = await prisma.user.update({
        where,
        data,
    });

    if (isUpdateVerificationCode) {
        await prisma.user.update({
            where,
            data: {
                isVerified: true,
            },
        });
    }

    return user;
}

export { handleFindSpecificUserByKey, handleSaveUser, handleUpdateUser };
