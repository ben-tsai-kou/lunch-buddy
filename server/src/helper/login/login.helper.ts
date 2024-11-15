import crypto from 'crypto';

function handleIsEmailDomainValid({
    validDomains,
    email,
}: {
    validDomains: string;
    email: string;
}): boolean {
    const domain = email.split('@')[1];
    return domain === validDomains;
}

function generateVerificationCode() {
    return crypto.randomBytes(3).toString('hex');
}

function validationUserInput({
    email,
    nickname,
    password,
}: {
    email: string;
    nickname: string;
    password: string;
}): string | null {
    if (!email) {
        return 'Email is required';
    }
    if (!nickname) {
        return 'nickname is required';
    }
    if (!password) {
        return 'password is required';
    }
    return null;
}

export {
    handleIsEmailDomainValid,
    generateVerificationCode,
    validationUserInput,
};
