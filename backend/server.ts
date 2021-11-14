/**
 * @fileoverview server.ts
 * This file handles the startup of the server
 */

/* import dependencies */
import express, { Application } from 'express';
import dotenv from 'dotenv';
import body_parser from 'body-parser';

/* set up */
dotenv.config();
const app: Application = express();

/* import modules */
import { debuglog } from './helpers';
import { connectDB } from './config'
import { router } from './routes'; // listen for router endpoints

/* import env variables */
const backend_port: string = process.env.BACKEND_PORT;

/* startup server */
connectDB(); // connect to the database
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use('/api', router); // all api routes will follow 'https://localhost:PORT/api/ENDPOINTS' format

app.listen(backend_port, (): void => {
    debuglog('LOG', 'server', `Server is listening on port ${backend_port}`);
});
