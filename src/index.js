import { connectToMongoDB } from './db/connectToMongoDB.js';
import { startServer } from './server.js';

await connectToMongoDB();
startServer();
