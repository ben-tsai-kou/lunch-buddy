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

export { handleIsEmailDomainValid, generateVerificationCode };
