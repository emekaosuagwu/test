import express from 'express';
import * as EducationController from '../controllers/education';
import ValidateRequest from '../utils/middlewares/validate-request';

const EducationRoutes = express.Router();
EducationRoutes.use(ValidateRequest);

EducationRoutes.post('/add', EducationController.AddEducation);
EducationRoutes.put('/update', EducationController.UpdateEducation);
EducationRoutes.delete('/delete', EducationController.DeleteEducation);

export default EducationRoutes;
