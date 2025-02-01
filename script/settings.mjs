// import esbuildPluginTsc from 'esbuild-plugin-tsc';
import path from 'node:path'
import { readFileSync } from 'node:fs'
// import { createPlugin as tsconfigPathsPlugin } from 'esbuild-plugin-tsconfig-paths';
// import TsconfigPathsPlugin from '@esbuild-plugins/tsconfig-paths';
import * as url from 'node:url'

// Use import.meta.url to get the directory name
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export function createBuildSettings(options) {
    // const tsconfig = JSON.parse(readFileSync(path.resolve(__dirname, '../tsconfig.json'), 'utf-8'))
    // const tsconfig = JSON.parse(readFileSync('./tsconfig.json'), 'utf-8');

    // Extract paths and baseUrl from tsconfig
    // const { paths, baseUrl } = tsconfig.compilerOptions || {}
    // const aliases = {}
    // // Dynamically create alias mappings from tsconfig paths
    // if (paths) {
    //     Object.keys(paths).forEach((alias) => {
    //         const realPath = paths[alias][0].replace('/*', '') // Get the path without the wildcard
    //         aliases[alias.replace('/*', '')] = path.resolve(baseUrl, realPath)
    //     })
    // }
    return {
        entryPoints: ['src/**/*.ts', 'src/**/*.js'],
        outdir: 'build',
        bundle: false,
        plugins: [
            // TsconfigPathsPlugin({ tsconfig: 'tsconfig.json' }),
            // esbuildPluginTsc({
            //     force: true
            // })
            // Use tsconfig-paths plugin to resolve paths
        ],
        resolveExtensions: ['.ts', '.js'],
        // alias: aliases, // Add alias mappings here
        // external: Object.keys(aliases),
        // tsconfig: '../tsconfig.json', // Optional: Path to your TypeScript configuration file.
        // absWorkingDir: __dirname, // Optional: Absolute working directory for resolving paths.
        ...options
    }
}

