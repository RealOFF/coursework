import { Environment } from './config/environment';
import { Server } from './server/app';
import { logger } from './helpers/logger';
import { connectToDatabase } from './config/db';
/**
 * Setuping environment variables
 */
Environment.setup();
import 'reflect-metadata';

import { Application } from 'express';

import { config } from './config/config';

async function startServer() {
	await connectToDatabase();
	const server = new Server();
	const app: Application = await server.server();
	app.listen(config.SERVER_PORT, () => {
		console.log(
			`Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`,
		);
		logger.info(
			`Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`,
		);
	});
}

startServer();

process.on('uncaughtException', (e) => {
	console.log(e);
	process.exit(1);
});

process.on('unhandledRejection', (e) => {
	console.log(e);
	process.exit(1);
});
