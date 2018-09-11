import express from 'express';
import * as WorkHistoryController from '../controllers/work_history'

const WorkHistoryRoutes = express.Router();

WorkHistoryRoutes.post('/', WorkHistoryController.CreateWorkHistory);

export default WorkHistoryRoutes;
