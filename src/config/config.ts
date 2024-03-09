import { createDevelopmentConfig } from './envs/development';

export const appConfig = getConfig();

function getConfig() {
	switch (process.env.NODE_ENV) {
		case 'development':
			return createDevelopmentConfig();
		default:
			throw new Error(`Invalid NODE_ENV "${process.env.NODE_ENV}"`);
	}
}
