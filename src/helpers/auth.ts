import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { config } from '../config/config';

export const getAuthMiddleware = (): any => {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: config.AUTH_TOKEN_SECRET,
	};

	passport.use(
		new Strategy(options, (jwt_payload, done) => {
			return done(null, true);
		}),
	);

	return passport.authenticate('jwt', { session: false });
};

const authMiddleware = config.ENABLE_AUTH
	? getAuthMiddleware()
	: (req: any, res: any, next: () => any) => next();

export { authMiddleware };
