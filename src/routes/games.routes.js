import {Router} from "express"
import { createGame, sendGames } from "../controllers/games.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { newGameSchema } from "../schemas/games.schema.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateSchema(newGameSchema), createGame)
gamesRouter.get("/games", sendGames)

export default gamesRouter;