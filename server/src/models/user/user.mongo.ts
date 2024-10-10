import mongoose from 'mongoose';

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    verificationCode: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    isMealAllowancesUsed: {
        type: Boolean,
        required: true,
        default: false,
    },
});

export const userModel = mongoose.model('User', user);
