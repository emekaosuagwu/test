import express from 'express';
import * as LanguageController from '../controllers/language';
import ValidateRequest from '../utils/middlewares/validate-request';

const LanguageRoutes = express.Router();
// LanguageRoutes.use(ValidateRequest);

LanguageRoutes.get('/add', LanguageController.AllLanguages);

export default LanguageRoutes;
