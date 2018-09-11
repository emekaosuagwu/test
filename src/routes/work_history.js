import express from 'express';
import * as WorkHistoryController from '../controllers/work_history'

const WorkHistoryRoutes = express.Router();

CountryRoutes.get('/', WorkHistoryController.init);

export default WorkHistoryRoutes;
