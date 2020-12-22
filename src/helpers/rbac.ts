import { Request, Response } from 'express';
import decodeJWT from 'jwt-decode';

interface TokenPayload {
	email: string;
	role: string;
	iat: number;
}

export const rbacMiddleware = (roles: string[]) => {
	return (req: Request, res: Response, next: any) => {
		const decodedInfo: TokenPayload = decodeJWT(req.headers.authorization);
		if (!decodedInfo.role || !roles.includes(decodedInfo.role)) {
			return res.status(403).json({ errors: ['Incorrect roles'] });
		}

		next();
	};
};
