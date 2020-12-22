import { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';

import { config } from '../../config/config';
import { IRouter } from '../router.interface';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

const router = Router();

export class AuthRouter implements IRouter {
	private userService: UserService;
	private authService: AuthService;

	constructor() {
		this.userService = new UserService();
		this.authService = new AuthService(config.AUTH_TOKEN_SECRET);
	}

	get routes() {
		router.post('/login', async (req: Request, res: Response) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			try {
				const user = await this.userService.getByEmail(req.body.email);

				if (!user) {
					return res.send('Username or password incorrect');
				}

				const token = this.authService.getToken(user);
				return res.send({ ...user, token });
			} catch (err) {
				throw err;
			}
		});

		router.post('/signup', async (req: Request, res: Response) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			try {
				const user = await this.userService.create(req.body);

				const token = this.authService.getToken(user);
				return res.send({ ...user, token });
			} catch (err) {
				throw err;
			}
		});

		return router;
	}
}
