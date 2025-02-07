import express from "express";
import cors from "cors";

import errorHandler from "./middleware/errorHandler";
import responseSender from "./middleware/responseSender";
import httpLogger from "./middleware/httpLogger";
import authenticator from "./middleware/authenticator";
import protectedRouter from "./routers/protectedRouter";
import authRouter from "./routers/authRouter";

const app = express();

app.use(httpLogger);

app.use(cors());

app.use(express.json());

app.use(authenticator);

app.use(authRouter);

app.use(protectedRouter);

app.use(errorHandler);

app.use(responseSender);

export default app;
