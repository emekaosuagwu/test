import express from 'express';
import * as LanguageController from '../controllers/language';

const LanguageRoutes = express.Router();

LanguageRoutes.get('/', LanguageController.GetLanguages);
LanguageRoutes.post('/add', LanguageController.AddLanguage);

export default LanguageRoutes;