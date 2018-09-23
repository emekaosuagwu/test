import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import logger from "./utils/middlewares/logger";

import AppRoutes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigin = process.env.NODE_ENV != "PRODUCTION" ? "http://localhost:9000" : process.env.CLIENT_URL;

const corsOptions = {

	origin: allowedOrigin,

	/**
	 * some legacy browsers ( e.g IE11) choke on 204
	 * @type {Number}
	 */
	optionsSuccessStatus: 200,
};

app.use(logger);
app.use(cors(corsOptions));
app.use(bodyParser.json({type: "application/json"}));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then().catch();

/**
 * Route middlewares
 */
app.use("/api/user", AppRoutes.UserRoutes);
app.use("/api/country", AppRoutes.CountryRoutes);
app.use("/api/language", AppRoutes.LanguageRoutes);
app.use("/api/user/work", AppRoutes.WorkHistoryRoutes);
app.use("/api/user/education", AppRoutes.EducationRoutes);
app.use("/api/user/portfolio", AppRoutes.PortfolioRoutes);
app.use("/api/job", AppRoutes.JobRoutes);

app.listen(port);
