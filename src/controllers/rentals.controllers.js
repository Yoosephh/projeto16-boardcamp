import { db } from "../database/database.js"

export async function sendRents(req,res) {
  try{
    const rents = await db.query(`SELECT * FROM rentals`)

    res.status(200).send(rents.rows)
    
  } catch(err){
    console.log(err)
  }
}

export async function newRent(req,res) {
  try{

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