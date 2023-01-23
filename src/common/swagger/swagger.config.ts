import { Application, Request, Response } from 'express';
import {serve, generateHTML, SwaggerUiOptions } from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const customCss = fs.readFileSync(path.resolve(__dirname, 'swagger-ui-custom.css'), 'utf8');

const swaggerUIOptions: SwaggerUiOptions = {
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

export default (app: Application): void => {
  app.use('/api-docs', serve, async (_req: Request, res: Response) => {
    return res.send(
      generateHTML(await import("./swagger.json"), swaggerUIOptions)
    );
  });
}