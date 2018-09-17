import express from 'express';
import * as JobController from '../controllers/job';
// import ValidateRequest from '../utils/middlewares/validate-request';

const JobRoutes = express.Router();


JobRoutes.post('/add', JobController.AddJob);

JobRoutes.delete('/delete', JobController.DeleteJob);

export default JobRoutes;
