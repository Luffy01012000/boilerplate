import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        title: 'My API',
        version: '1.0.0',
        title: 'Apis',
        contact: {
            name: 'API Support',
            email: 'chaudharyrutvik2024@gmail.com'
        },
        description: 'API documentation.'
    },
    host: 'localhost:8000',
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {},
    tags: [],
    schemes: ['http', 'https']
}

const outputFile = 'public/swagger-output.json'
const routes = ['src/app']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc)

