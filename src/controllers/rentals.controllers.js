import { db } from "../database/database.js"

export async function sendRents(req,res) {
  try{
    const rents = await db.query(`SELECT id, customerId, "gameId", TO_CHAR("rentDate", 'YYYY-MM-DD') AS "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee", customer, game  FROM rentals`)

    res.status(200).send(rents.rows)
    
  } catch(err){
    console.log(err)
  }
}

export async function newRent(req,res) {
  const { customerId, gameId, daysRented } = req.body;

  try{
    if (Number(daysRented) <= 0) return res.status(400).send("O numero de dias alugados está inconsistente")
    const checkCustomer = await db.query(`SELECT id FROM customers WHERE id = $1`, [customerId])
    const checkGame = await db.query(`SELECT id, "stockTotal" FROM games WHERE id = $1`, [gameId])
    if(checkCustomer.rows.length === 0 || checkGame.rows.length === 0) return res.sendStatus(400)
    if(checkGame.rows.stockTotal >= 0) return res.sendStatus(400)

    const rent = await db.query(`INSERT INTO rentals ("customerId", "gameId", "daysRented") VALUES ($1, $2, $3) RETURNING id`, [customerId, gameId, daysRented])

    res.status(201).send("Reserva realizada com sucesso! Divirta-se com os jogos :D")
  } catch(err){
    console.log(err)
  }
}

export async function closeRent(req,res) {
  try{

  } catch(err){
    console.log(err)
  }
}

export async function deleteRent(req,res) {
  try{

  } catch(err){
    console.log(err)
  }
}