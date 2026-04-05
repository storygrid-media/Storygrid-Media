import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
