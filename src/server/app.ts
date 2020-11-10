import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { ServerInterface } from './app.interface';
import { BaseRouter, router } from '../modules/baseRouter';
import swaggerDocument from '../../swagger.json';

export class Server implements ServerInterface {
	setupDocGenerator() {
		router.use('/docs', swaggerUi.serve);
		router.get('/docs', swaggerUi.setup(swaggerDocument));
	}
	async server(): Promise<Application> {
		const baseRouter = new BaseRouter();
		const app = express();
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use('/api/v1', baseRouter.routes); //setting up base route
		this.setupDocGenerator();
		// define a route handler for the default home page
		app.get('/', (req, res) => {
			res.send('Welcome to express-create application! ');
		});
		app.use(cors());
		return app;
	}
}
