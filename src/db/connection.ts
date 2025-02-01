/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Env } from '@app/types/types'
import config from '@config/config'

const env: Env = (process.env.NODE_ENV as Env) || 'development'

/**
 * @description adding sequelize typescript
 */

import { Sequelize } from 'sequelize-typescript'

import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
// import logger from '@app/util/logger'

const sequelize = new Sequelize({ ...config.DATABASE.development, logging: env === 'development' ? true : false })
// Dynamically load all models from the `modules` directory
const modelsDir = join(__dirname, '../model/')

readdirSync(modelsDir).forEach((moduleDir) => {
    const modelPath = join(modelsDir, moduleDir)
    // const modelPath = join(modelsDir, moduleDir, `${moduleDir}.model.ts`)
    try {
        if (existsSync(modelPath)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
            const model = require(modelPath)
             

            if (model && model.default) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                sequelize.addModels([model.default])
                // sequelize.define()
            }
        } else {
            // eslint-disable-next-line no-console
            console.warn(`Could not load model from ${moduleDir}:`)
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`Catch:Could not load model from ${modelPath}:`, err)
    }
})
export default sequelize

