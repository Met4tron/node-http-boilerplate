import pino from 'pino';

const logger = pino({
	name: 'node-http-boilerplate',
	base: null,
	redact: ['password', 'email'],
});

export const getLogger = () => logger;
