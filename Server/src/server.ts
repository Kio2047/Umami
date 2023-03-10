import express, { ErrorRequestHandler } from "express";
// import cors from "cors";
import morgan from "morgan";

import router from "./router";
import { backupErrorHandler } from "./Modules/errorHandlers";

const app = express();
app.use(morgan("dev"));
// app.use(cors());
app.use(express.json());
app.use(router);
app.use(backupErrorHandler);

export default app;
