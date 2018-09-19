import express from 'express';
import * as LanguageController from '../controllers/language';

const LanguageRoutes = express.Router();

LanguageRoutes.get('/', LanguageController.AllLanguages);

export default LanguageRoutes;
