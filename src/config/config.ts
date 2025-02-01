import { Options } from 'sequelize'
import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export const config = {
    development: {
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PSSWD,
        port: parseInt(process.env.DB_PORT || '5432'),
        host: process.env.DB_HOST,
        dialect: 'postgres'
    } as Options,
    test: {
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PSSWD,
        port: parseInt(process.env.DB_PORT || '5432'),
        host: process.env.DB_HOST,
        dialect: 'postgres'
    } as Options,
    production: {
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PSSWD,
        port: parseInt(process.env.DB_PORT || '5432'),
        host: process.env.DB_HOST,
        dialect: 'postgres'
    } as Options
}

export default {
    // General
    ENV: process.env.NODE_ENV,
    PORT: process.env.APP_PORT,
    SERVER_URL: process.env.SERVER_URL,

    // Database
    DATABASE: config
} as const
