import dayjs from "dayjs"
import { db } from "../database/database.js"

export async function sendRents(req,res) {
  try{
    const rents = await db.query(`
    SELECT
      rentals.id,
      rentals."customerId",
      rentals."gameId",
      TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate",
      rentals."daysRented",
      rentals."returnDate",
      rentals."originalPrice",
      rentals."delayFee",
      JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS "customer",
      JSON_BUILD_OBJECT('id', games.id, 'name', games.name) AS "game"
    FROM rentals
    JOIN games
      ON rentals."gameId" = games.id
    JOIN customers
      ON rentals."customerId" = customers.id
  `);

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
    const checkGame = await db.query(`SELECT id, "stockTotal", "pricePerDay" FROM games WHERE id = $1`, [gameId])
    
    if(checkCustomer.rows.length === 0 || checkGame.rows.length === 0) return res.status(400).send("Falhou aqui")
    console.log(checkGame.rows[0].stockTotal)
    if(checkGame.rows[0].stockTotal <= 0) return res.status(400).send("O jogo selecionado está indisponível para aluguel")

    await db.query(`
      INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "delayFee", "originalPrice") 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id`, 
      [customerId, gameId, daysRented, dayjs().format('YYYY-MM-DD'), null, null, (checkGame.rows[0].pricePerDay * daysRented)])

    await db.query(`UPDATE games SET "stockTotal" = $1 WHERE id = $2`, [(checkGame.rows[0].stockTotal - 1), gameId] )

    res.status(201).send("Reserva realizada com sucesso! Divirta-se com os jogos :D")
  } catch(err){
    console.log(err)
  }
}

export async function closeRent(req,res) {
  const { customerId, gameId, daysRented } = req.body;

  try{
    if (Number(daysRented) <= 0) return res.status(400).send("O numero de dias alugados está inconsistente")

    const checkCustomer = await db.query(`SELECT id FROM customers WHERE id = $1`, [customerId])
    const checkGame = await db.query(`SELECT id, "stockTotal", "pricePerDay" FROM games WHERE id = $1`, [gameId])

    if(checkCustomer.rows.length === 0 || checkGame.rows.length === 0) return res.sendStatus(400)

    if(checkGame.rows[0].stockTotal >= 0) return res.sendStatus(400)

    await db.query(`INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "delayFee", "originalPrice") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`, [customerId, gameId, daysRented, dayjs().format('YYYY-MM-DD'), null, null, (checkGame.rows[0].pricePerDay * daysRented) ])

  res.status(200).send("Devolução efetuada com sucesso!")
  } catch(err){
    console.log(err)
  }
}

export async function deleteRent(req,res) {
  try{

    return res.status(200).send("Registro deletado com sucesso!")
  } catch(err){
    console.log(err)
  }
}