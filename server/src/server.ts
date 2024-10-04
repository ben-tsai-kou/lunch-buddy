import http from 'http';
import app from './app';

const port = 3000;
const server = http.createServer(app);

const startServer = async () => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();
