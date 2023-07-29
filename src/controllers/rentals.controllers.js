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