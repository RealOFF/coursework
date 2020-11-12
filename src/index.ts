import { Application } from 'express';
import 'reflect-metadata';

import { config } from './config/config';
import { connectToDatabase } from './config/db';
import { Environment } from './config/environment';
import { logger } from './helpers/logger';
import { Server } from './server/app';

/**
 * Setuping environment variables
 */
Environment.setup();

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
