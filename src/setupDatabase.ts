import mongoose from 'mongoose';
import { config } from './config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('Connected to database');
      })
      .catch((error) => {
        log.error('Error connecting to database', error);
        // Terminate the Node.js process explicitly if an error occurs.
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};
