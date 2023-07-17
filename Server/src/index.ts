import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./server";
import { connectDBClient } from "./models";

(async () => {
  try {
    const port = process.env.PORT || 3001;
    await connectDBClient();
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
