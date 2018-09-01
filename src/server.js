import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import logger from './utils/middlewares/logger';

import AppRoutes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(bodyParser.json({type: 'application/json'}));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('Database Connected'))
  .catch(error => console.log('Error connecting to database', error));

// Route middlewares
app.use('/api/user', AppRoutes.UserRoutes);
app.use('/api/country', AppRoutes.CountryRoutes);
app.use('/api/language', AppRoutes.LanguageRoutes);

app.listen(port, () => console.log(`Server running on port:${port}!`));
