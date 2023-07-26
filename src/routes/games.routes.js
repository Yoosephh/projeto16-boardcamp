import {Router} from "express"
import { createGame, sendGames } from "../controllers/games.controllers.js";

const gamesRouter = Router();

gamesRouter.post("/games", createGame)
gamesRouter.get("/games", sendGames)

export default gamesRouter;