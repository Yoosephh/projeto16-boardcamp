import {Router} from "express"
import { newRent, sendRents } from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", newRent)
rentalsRouter.get("/rentals", sendRents)
// rentalsRouter.put("/rentals/:id/return")
// rentalsRouter.delete("/rentals/:id")

export default rentalsRouter;