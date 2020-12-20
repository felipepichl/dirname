import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

/**
 * My database config
 */

import '../database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    /**
     * Absolute path
     */
    this.server.use(
      '/files',
      express.static(
        path.resolve(__dirname, '..', '..', 'uploads', 'resized', 'avatar')
      )
    );

    this.server.use(
      '/posts',
      express.static(
        path.resolve(__dirname, '..', '..', 'uploads', 'resized', 'post')
      )
    );
    /**
     * Lib for log in request http
     */
    this.server.use(morgan('dev'));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
