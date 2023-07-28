import { db } from "../database/database.js"

export async function showCustomers(req,res) {
  try{
    const customersList = await db.query(`SELECT * FROM customers`)

    res.status(200).send(customersList.rows)

  } catch (err) {
    console.log(err)
  }
}

export async function showCustomer(req,res) {

  const { id } = req.params

  try{
    const customer = await db.query(`SELECT * FROM customers WHERE customers.id = $1`, [id])

    res.status(200).send(customer.rows)

  } catch (err) {
    console.log(err)
  }
}

export async function newCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body
  try{
    const checkCustomer = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])
    if (checkCustomer.rows.length > 0) return res.status(409).send("Usuario já cadastrado!")

    await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])

    res.status(201).send("Cliente cadastrado! :)")
  } catch (err) {
    console.log(err)
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body
  const { id } = req.params
  try{
    const user = await db.query(`SELECT * FROM customers WHERE id = $1`, [id])

    if(!user || !user.cpf) return res.status(400).send("Verifique seus dados e tente novamente!")

    if (user.cpf !== cpf) return res.status(409).send("Verifique seus dados e tente novamente!")

    await db.query(`UPDATE customers name = $1, phone = $2, birthday = $3 WHERE id = $4`, [name, phone, birthday, id])
  } catch (err) {
    console.log(err)
  }
}