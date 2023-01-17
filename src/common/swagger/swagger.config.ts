import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';
import fs from 'fs';
import config from 'config';
import path from 'path';

const customCss = fs.readFileSync(path.resolve(__dirname, 'swagger-ui-custom.css'), 'utf8');

const oaS3Options: swaggerJSDoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lirest API',
      version: '0.1.0',
      description: 'API documentation for Lirest service',
      termsOfService: 'http://example.com/terms/',
      contact: {
        name: 'Support Team',
        url: 'https://www.facebook.com/profile.php?id=100062704105227',
        email: 'foet1997@gmail.com',
      },
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
    },
    servers: [
      {
        url: `http://${config.get('service.host')}:${config.get('service.port')}`,
        description: 'Lirest API Documentation',
      },
    ],
    tags: [
      {
        name: 'Ping',
        description: 'Test service connection',
      },
      {
        name: 'User',
        description: 'User operations',
      },
      {
        name: 'Book',
        description: 'Book operations',
      },
      {
        name: 'Auth',
        description: 'Auth operations',
      },
      {
        name: 'Category',
        description: 'Category operations',
      },
    ],
  },
  apis: ['./src/api-docs/**/*.yaml'],
};

export const swaggerUIOptions: SwaggerUiOptions = {
  explorer: true,
  customCss,
  swaggerOptions: {
    validatorUrl: null,
    syntaxHighlight: {
      activate: false,
    },
    displayOperationId: true,
  },
};

export const openAPISpecification = swaggerJSDoc(oaS3Options);
