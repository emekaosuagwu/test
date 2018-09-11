import express from 'express';
import * as WorkHistoryController from '../controllers/work_history'
import ValidateRequest from '../utils/middlewares/validate-request';

const WorkHistoryRoutes = express.Router();
WorkHistoryRoutes.use(ValidateRequest);

WorkHistoryRoutes.post('/create', WorkHistoryController.CreateWorkHistory);
WorkHistoryRoutes.delete('/delete', WorkHistoryController.DeleteWorkHistory);

export default WorkHistoryRoutes;
