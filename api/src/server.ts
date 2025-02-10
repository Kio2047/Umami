import express from "express";
import cors from "cors";

import errorHandler from "./middleware/errorHandler";
import httpLogger from "./middleware/httpLogger";
import notFoundHandler from "./middleware/notFoundHandler";
import authRouter from "./modules/auth/auth.routes";
import userRouter from "./modules/user/user.routes";
import postRouter from "./modules/post/post.routes";
import miscRouter from "./modules/misc/misc.routes";

const app = express();

app.use(httpLogger);

app.use(cors());

app.use(express.json());

app.use(authRouter, userRouter, postRouter, miscRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
