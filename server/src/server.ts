import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || '';
const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

const startServer = async () => {
    await mongoose.connect(MONGO_URL);
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();
