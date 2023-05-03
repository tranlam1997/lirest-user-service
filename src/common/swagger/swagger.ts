import { Application } from 'express';
import { serve, SwaggerUiOptions, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import config from 'config';

const oaS3Options: swaggerJSDoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'lirest-user-service',
      version: '0.1.0',
      description: 'API documentation for lirest user service',
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
    tags: [
      {
        name: 'Ping',
        description: 'Test service connection',
      },
      {
        name: 'User',
        description: 'User operations',
      }
    ],
  },
  apis: ['./src/api-docs/**/*.yaml'],
};

const swaggerUIOptions: SwaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    validatorUrl: null,
    syntaxHighlight: {
      activate: false,
    },
    displayOperationId: true,
  },
};


export default (app: Application): void => {
  app.use('/api-docs', serve, setup(swaggerJSDoc(oaS3Options), swaggerUIOptions));
}