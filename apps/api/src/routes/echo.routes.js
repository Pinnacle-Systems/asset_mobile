import { Router } from "express";
import { z } from "zod";

import { validateBody } from "@repo/validation";

import { echoController } from "../controllers/echo.controller.js";

const router = Router();
const echoSchema = z.object({
  message: z.string().trim().min(1),
});

router.post("/echo", validateBody(echoSchema), echoController);

export default router;
