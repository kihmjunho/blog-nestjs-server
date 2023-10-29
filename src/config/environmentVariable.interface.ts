export interface EnvironmentVariableInterface {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SYNCHRONIZE: boolean;
  DB_LOGGING: boolean;
  JWT_SECRET: string;
}
