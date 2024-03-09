import { Kysely, PostgresDialect } from 'kysely';
import Pool from 'pg';
import { appConfig } from '~config/config';
import type { Database } from '~infra/database/schema';

const dialect = new PostgresDialect({
	pool: new Pool.Pool({
		database: appConfig.database.database,
		host: appConfig.database.host,
		user: appConfig.database.user,
		password: appConfig.database.password,
		port: appConfig.database.port,
		max: 10,
	}),
});

export const databaseConnection = new Kysely<Database>({
	dialect,
});
