import logger from '@app/util/logger'

export function handleError(error: unknown, msg?: string): void {
    if (error instanceof Error) {
        if (msg) {
            logger.error(msg, error.message)
        }
    } else {
        logger.error('An unexpected error occurred:', error)
    }
}

