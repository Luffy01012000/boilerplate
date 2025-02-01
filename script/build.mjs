import * as esbuild from 'esbuild'
import { createBuildSettings } from './settings.mjs'

const settings = createBuildSettings({
    minify: true,
    platform: 'node',
    sourcemap: true,
    format: 'cjs'
    // external: ['nock', 'aws-sdk', 'aws-sdk', 'mock-aws-s3'],
    // loader: { '.html': 'text' }
})

esbuild
    .build(settings)
    .then((res) => console.log('build successfully', res))
    .catch((err) => {
        console.error('Build failed:', err)
        process.exit(1)
    })

