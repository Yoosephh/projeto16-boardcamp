import { db } from "../database/database.js"

export async function sendGames(req, res) {
  try{

    const gamesList = await db.query("SELECT * FROM games;")

    res.send(gamesList)

  }catch(err){
    console.log(err)
  }
}

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body
  try{
    await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay])

    res.sendStatus(201)
  } catch(err){
    console.log(err)
  }
}