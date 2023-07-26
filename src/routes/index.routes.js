import { Router } from "express";
import clientsRouter from "./clients.routes.js";
import gamesRouter from "./games.routes.js";
import rentalsRouter from "./rentals.routes.js";

const router = Router();

// router.use(clientsRouter)
router.use(gamesRouter)
// router.use(rentalsRouter)

export default router