import express from 'express';
import * as CountriesController from '../controllers/country'

const CountryRoutes = express.Router();

CountryRoutes.get('/', CountriesController.GetCountries);
CountryRoutes.post('/add', CountriesController.AddCountry);

export default CountryRoutes;
