import mongoose from 'mongoose';
import { getEnv } from '../helpers/getEnv.js';
import { ENV_VARS } from '../constants/env.js';
import { Student } from './models/student.js';

const clientOptions = {
  serverApi: { version: '1', strict: false, deprecationErrors: true },
};

export async function connectToMongoDB() {
  try {
    const user = getEnv(ENV_VARS.DB_USER);
    const password = getEnv(ENV_VARS.DB_PASSWORD);
    const host = getEnv(ENV_VARS.DB_HOST);
    const db = getEnv(ENV_VARS.DB_NAME);

    const uri = `mongodb+srv://${user}:${password}@${host}/${db}?appName=Cluster0`;

    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    await mongoose.syncIndexes();
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (error) {
    console.error('Failed to connect to db', error);
    process.exit(1);
  }
}
