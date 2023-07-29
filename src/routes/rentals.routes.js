import {Router} from "express"
import { closeRent, newRent, sendRents } from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", newRent)
rentalsRouter.get("/rentals", sendRents)
rentalsRouter.put("/rentals/:id/return", closeRent)
// rentalsRouter.delete("/rentals/:id")

export default rentalsRouter;