import express from 'express';
import * as LanguageController from '../controllers/language';

const LanguageRoutes = express.Router();

// LanguageRoutes.get('/all', LanguageController.GetLanguages);
LanguageRoutes.post('/create', LanguageController.CreateLanguage);

export default LanguageRoutes;