import { Router } from "express";

import echoRoutes from "./echo.routes.js";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use(healthRoutes);
router.use(echoRoutes);

export default router;
