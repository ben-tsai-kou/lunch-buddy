import axios from 'axios';

import { userModel } from './user.mongo';

async function handleSaveUser({
    email,
    verificationCode,
}: {
    email: string;
    verificationCode: string;
}) {
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
        throw new Error('User already exist');
    }

    const user = new userModel({
        email,
        verificationCode,
    });
    user.save();
}

export { handleSaveUser };
