import express, { Express } from 'express';
import { EchoRippleServer } from './setupServer';
import connectDatabase from './setupDatabase';
import { config } from './config';

class Application {
  public initialize(): void {
    this.loadConfig();
    connectDatabase();

    const app: Express = express();
    const server: EchoRippleServer = new EchoRippleServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();
