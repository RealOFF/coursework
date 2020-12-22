import JWT from 'jsonwebtoken';

import { IGetTokenArguments } from './auth.service.interface';

export class AuthService {
	private tokenSecret: string;
	constructor(tokenSecret: string) {
		this.tokenSecret = tokenSecret;
	}
	getToken(user: IGetTokenArguments) {
		return JWT.sign(
			{ email: user.email, role: user.role },
			this.tokenSecret,
		);
	}
}
