import express from 'express';
import * as LanguageController from '../controllers/language';

const LanguageRoutes = express.Router();

LanguageRoutes.get('/all', LanguageController.AllLanguages);
LanguageRoutes.post('/create', LanguageController.CreateLanguages);

export default LanguageRoutes;
