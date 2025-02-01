 
// import 'module-alias/register'
import app from './app'
import config from './config/config'
import logger from './util/logger'
import sequelize from './db/connection'
import type { Server } from 'http'
import { handleError } from './helper/helperFunctios'
import User from './model/user.model'

const PORT = config.PORT

let server: Server
// db.
sequelize
    .authenticate()
    .then(async () => {
        logger.info('Connection has been established successfully.')
        try {
            await sequelize.sync({ force: false, alter: true }) // Set to true to drop and recreate tables
            logger.info('Database synced successfully.', { meta: '' })
            // server =
            server = app.listen(PORT, () => {
                logger.info('APPLICATION_STARTED', { meta: `Server is running on port ${PORT}` })
            })
            const resdb = await User.create({ firstname: 'Goku' })
            logger.info('DB response:', { meta: resdb })
            process.on('SIGTERM', () => {
                logger.info('SIGTERM signal received: closing HTTP server')
                server.close(() => {
                    logger.info('HTTP server closed')
                    process.exit(0)
                })
            })

            process.on('SIGINT', () => {
                logger.info('SIGINT signal received: closing HTTP server')
                server.close(() => {
                    logger.info('HTTP server closed')
                    process.exit(0)
                })
            })
        } catch (error: unknown) {
            handleError(error, 'Error syncing database:')
            server.close((err) => {
                if (err) {
                    handleError('Application_Error')
                }
                process.exit(1)
            })
        }
    })
    .catch((error: Error) => {
        handleError(error, 'Unable to connect to the database:')
    })

