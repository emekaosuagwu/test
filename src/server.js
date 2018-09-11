import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import logger from './utils/middlewares/logger';

import AppRoutes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigin = process.env.NODE_ENV != "PRODUCTION" ? 'http://localhost:9000' : process.env.CLIENT_URL;
const corsOptions = {
  origin: allowedOrigin,
  optionsSuccessStatus: 200 // some legacy browsers ( e.g IE11) choke on 204
}

app.use(logger);
app.use(cors(corsOptions));
app.use(bodyParser.json({type: 'application/json'}));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('Database Connected'))
  .catch(error => console.log('Error connecting to database', error));

// Route middlewares
app.use('/api/user', AppRoutes.UserRoutes);
app.use('/api/country', AppRoutes.CountryRoutes);
app.use('/api/language', AppRoutes.LanguageRoutes);
app.use('/api/work_history', AppRoutes.WorkHistoryRoutes);
app.use('/api/user/education', AppRoutes.EducationRoutes);

app.listen(port, () => console.log(`Server running on port:${port}!`));
