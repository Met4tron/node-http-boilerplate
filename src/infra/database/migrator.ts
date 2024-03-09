import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import * as path from 'node:path';
import { program } from 'commander';
import {
	FileMigrationProvider,
	Kysely,
	type MigrationResultSet,
	Migrator,
	PostgresDialect,
} from 'kysely';
import pg from 'pg';
import { appConfig } from '~config/config';
import type { Database } from './schema';

const db = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool: new pg.Pool({
			database: appConfig.database.database,
			host: appConfig.database.host,
			user: appConfig.database.user,
			password: appConfig.database.password,
			port: appConfig.database.port,
			ssl: appConfig.database.ssl,
			max: 1,
		}),
	}),
});

const migrationFolder = new URL('./migrations', import.meta.url).pathname;

const migrator = new Migrator({
	db,
	provider: new FileMigrationProvider({
		fs: fsPromise,
		path,
		migrationFolder: migrationFolder,
	}),
});

const showResults = ({ error, results }: MigrationResultSet) => {
	if (!results?.length) {
		console.log('All migrations are done');
		process.exit(0);
	}

	for (const it of results) {
		if (it.status === 'Success') {
			console.log(`migration "${it.migrationName}" was executed successfully`);
			continue;
		}

		if (it.status === 'NotExecuted') {
			console.log(`migration "${it.migrationName}" skipped`);
		}

		console.error(`failed to execute migration "${it.migrationName}"`);
	}

	if (error) {
		console.error('failed to migrate');
		console.error(error);
		process.exit(1);
	}
};

const up = async () => {
	const result = await migrator.migrateToLatest();
	showResults(result);
};

const rollback = async () => {
	const result = await migrator.migrateDown();
	showResults(result);
};

const rollbackAll = async () => {
	const migrations = await migrator.getMigrations();
	const downMigrations = migrations.map(async (migration) => {
		const result = await migrator.migrateDown();
		showResults(result);
	});

	await Promise.all(downMigrations);
};

const redo = async () => {
	console.log('Running down migrations');
	const migrations = await migrator.getMigrations();

	for (const migration of migrations) {
		await migrator.migrateTo(migration.name);
	}

	console.log('Running pending migrations');
	const results = await migrator.migrateToLatest();
	showResults(results);
};

const create = async (name: string) => {
	const dateStr = Date.now();
	const fileName = `${migrationFolder}/${dateStr}-${name}.ts`;

	const migrationTemplate = `import { type Kysely } from "kysely";

// biome-ignore lint/suspicious/noExplicitAny: db client used in migration
export async function up(db: Kysely<any>): Promise<void> {}

// biome-ignore lint/suspicious/noExplicitAny: db client used in migration
export async function down(db: Kysely<any>): Promise<void> {}
  `;

	if (!fs.lstatSync(migrationFolder).isDirectory()) {
		fs.mkdirSync(migrationFolder);
	}

	fs.writeFileSync(fileName, migrationTemplate, 'utf8');
	console.log('Created Migration:', fileName);
};

program
	.command('up')
	.description('Run any pending migrations')
	.action(async () => {
		await up();
	});

program
	.command('down')
	.description('Run most recent rollback')
	.action(async () => await rollback());

program
	.command('redo')
	.description('Run most recent rollback')
	.action(async () => await redo());

program
	.command('down:all')
	.description('Run all migrations down')
	.action(async () => await rollbackAll());

program
	.command('create')
	.description('Create a new migration')
	.argument('<input-file>')
	.action(async (name) => await create(name));

program.parseAsync().then(() => db.destroy());
