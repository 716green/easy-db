import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { getDocumentsByUserId } from "./typeorm/functions/document";
import { getUsers } from "./typeorm/functions/user";
import { User } from "./typeorm/entities/User";
dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/databasesByUser", async (req: Request, res: Response) => {
  const { useremail } = req.headers;
  const userData: User[] = await getUsers(useremail as string);
  const userId = userData[0].id;
  const documents = await getDocumentsByUserId(userId);
  const docNames = documents.map((doc) => doc.docName);
  res.json({ documents: docNames });
});

app.post("/documentByUserAndKey", async (req: Request, res: Response) => {
  const { useremail } = req.headers;
  const { docName } = req.body;
  const userData: User[] = await getUsers(useremail as string);
  const userId = userData[0].id;
  const document = (await getDocumentsByUserId(userId, docName))[0];

  res.json({ document });
});

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
