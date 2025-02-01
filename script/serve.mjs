import esbuild from 'esbuild'
import { createBuildSettings } from './settings.mjs'

const settings = createBuildSettings({
    // minify: true,
    metafile: true,
    platform: 'node',
    sourcemap: true,
    format: 'cjs'
    // banner: {
    //     js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`
    // }
})

const ctx = await esbuild.context(settings)

await ctx.watch()

const { host, port } = await ctx.serve({
    port: 5500,
    servedir: 'build',
    fallback: 'build/server.js'
})

console.log(`Serving app at ${host}:${port}.`)

