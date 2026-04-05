import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import contactRouter from "./contact.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/contact", contactRouter);

export default router;
