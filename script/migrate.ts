/* eslint-disable no-console */
import { exec } from 'child_process'

// Command Line Arguments
const command: string = process.argv[2]
const migrationName: string | undefined = process.argv[3]

// Valid Migration Commands
const validCommands: string[] = ['create', 'up', 'down', 'list', 'prune']
if (!validCommands.includes(command)) {
    console.error(`Invalid command: Command must be one of ${validCommands.join(', ')}`)
    process.exit(0)
}

const commandsWithoutMigrationNameRequired: string[] = ['list', 'prune']
if (!commandsWithoutMigrationNameRequired.includes(command) && !migrationName) {
    console.error('Migration name is required')
    process.exit(0)
}

function runNpmScript(): Promise<string> {
    return new Promise((resolve, reject) => {
        let execCommand: string

        if (commandsWithoutMigrationNameRequired.includes(command)) {
            execCommand = `migrate ${command}`
        } else {
            execCommand = `migrate ${command} ${migrationName}`
        }

        const childProcess = exec(execCommand, (error, stdout) => {
            if (error) {
                reject(new Error(`Error running script: ${error.message}`))
            } else {
                resolve(stdout)
            }
        })

        childProcess.stderr?.on('data', (data: string) => {
            console.error(data)
        })
    })
}

// Example usage:
runNpmScript()
    .then((output) => {
        console.info(output)
    })
    .catch((error) => {
        console.error('Error:', error)
    })

