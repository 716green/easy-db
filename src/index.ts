import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { getDocumentsByUserId } from "./typeorm/functions/document";
dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

(async () => {
  const doc = await getDocumentsByUserId(1);
  console.log(doc);
})();

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
