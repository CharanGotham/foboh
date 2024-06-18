// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import { router as productRouter } from './controller/product';
import { router as profileRouter } from './controller/profile';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3001'
}));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'FOBOH Pricing API',
      version: '1.0.0',
    },
  },
  apis: ['./src/controller/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/products', productRouter);
app.use('/profiles', profileRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
