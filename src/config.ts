import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config();

class Config {
  public DATABASE_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public REDIS_HOST: string | undefined;

  private readonly DEFAULT_DATABASE_URL = 'mongodb://127.0.0.1:27017/echo-ripple';

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.NODE_ENV = process.env.NODE_ENV;
    this.REDIS_HOST = process.env.REDIS_HOST || '';
  }

  public createLogger(name: string) {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    }
  }
}

const config: Config = new Config();
export { config };
