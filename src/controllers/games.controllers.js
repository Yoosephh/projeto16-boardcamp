import { db } from "../database/database.js"

export async function sendGames(req, res) {
  try{

    const gamesList = await db.query("SELECT * FROM games;")

    console.log(gamesList.rows)

    res.send(gamesList.rows)

  }catch(err){
    console.log(err)
  }
}

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body
  try{
    const checkGame = await db.query(`SELECT * FROM games WHERE name = $1`, [name])
    if (checkGame.rows.length > 0) {
      return res.status(409).send("Jogo já cadastrado!")
    }
    await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay])

    res.sendStatus(201)
  } catch(err){
    console.log(err)
  }
}