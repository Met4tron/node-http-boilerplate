export type ServerConfig = {
  port: number;
};

export type DatabaseConfig = {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
  ssl: boolean;
};

export type AppConfig = {
  env: "development" | "test" | "staging" | "production";
  server: ServerConfig;
  database: DatabaseConfig;
};
