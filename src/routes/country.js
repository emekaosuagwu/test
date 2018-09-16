import express from 'express';
import * as CountriesController from '../controllers/country';

const CountryRoutes = express.Router();

CountryRoutes.get('/all', CountriesController.AllCountries);
CountryRoutes.post('/create', CountriesController.CreateCountry);

export default CountryRoutes;
