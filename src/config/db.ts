import { createConnection } from 'typeorm';

import { logger } from '../helpers/logger';
import { config } from './config';

export async function connectToDatabase() {
	try {
		const connections = await createConnection({
			type: config.TYPEORM_CONNECTION,
			host: config.DB_HOST,
			port: config.DB_PORT,
			username: config.DB_USERNAME,
			password: config.DB_PASSWORD,
			database: config.DB_NAME,
			entities: [__dirname + '/../models/entities/*.*'],
			synchronize: true,
			logging: config.TYPEORM_DEBUG_MODE,
		});
		return connections;
	} catch (err) {
		console.log(err);
		logger.error(err.message);
		throw err;
	} finally {
		console.log(
			`Type: ${config.TYPEORM_CONNECTION}, host: ${config.DB_HOST}, port: ${config.DB_PORT}`,
		);
	}
}
