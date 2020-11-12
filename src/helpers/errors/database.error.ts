export class DatabaseError extends Error {
	static REASONS = {
		NOT_FOUND: 'NOT FOUND',
	};
	name = 'DatabaseError';
	reason: string;
}
