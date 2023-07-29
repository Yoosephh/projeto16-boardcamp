import {Router} from "express"
import { closeRent, deleteRent, newRent, sendRents } from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", newRent)
rentalsRouter.get("/rentals", sendRents)
rentalsRouter.post("/rentals/:id/return", closeRent)
rentalsRouter.delete("/rentals/:id", deleteRent)

export default rentalsRouter;