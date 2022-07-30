import express from "express"
import cors from "cors"

import router from "./router"
import { connectDBClient } from "./Models";

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router)

async () => {
  try{
    connectDBClient()
    app.listen(port, () => {
      console.log(`Express listening on ${port}`);
    })
  }
  catch (error) {
    console.log(error);
  }
}