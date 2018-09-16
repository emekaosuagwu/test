import express from 'express';
import * as PortfolioController from '../controllers/portfolio';
import ValidateRequest from '../utils/middlewares/validate-request';

const PortfolioRoutes = express.Router();
// PortfolioRoutes.use(ValidateRequest);

PortfolioRoutes.get('/:user_id', PortfolioController.GetPortfolio);

// PortfolioRoutes.post('/add', PortfolioController.AddPortfolio);
PortfolioRoutes.post('/add', ValidateRequest, PortfolioController.AddPortfolio);

PortfolioRoutes.put('/update', ValidateRequest, PortfolioController.UpdatePortfolio);

PortfolioRoutes.delete('/delete', ValidateRequest, PortfolioController.DeletePortfolio);

export default PortfolioRoutes;
