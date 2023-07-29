import { db } from "../database/database.js"

export async function showCustomers(req,res) {
  try{
    const customersList = await db.query(`SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers`)

    res.status(200).send(customersList.rows)

  } catch (err) {
    console.log(err)
  }
}

export async function showCustomer(req,res) {

  const { id } = req.params

  try{
    const customer = await db.query(`SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers WHERE customers.id = $1`, [id])
    if (customer.rows.length === 0) return res.status(404).send("Usuario não encontrado no sistema!")

    res.status(200).send(customer.rows[0])

  } catch (err) {
    console.log(err)
  }
}

export async function newCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body
  try{
    const checkCustomer = await db.query(`SELECT cpf FROM customers WHERE cpf = $1`, [cpf])
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
    const userId = await db.query(`SELECT id , cpf FROM customers WHERE id = $1`, [id])
    const userCPF = await db.query(`SELECT id , cpf FROM customers WHERE cpf = $1`, [cpf])

    if(userId.rows.length === 0) return res.status(400).send("Verifique seus dados e tente novamente!")
    
    if (Number(id) !== userCPF.rows[0].id) return res.status(409).send("Verifique seus dados e tente novamente!")

    await db.query(`UPDATE customers SET name = $1, phone = $2, birthday = $3 WHERE id = $4`, [name, phone, birthday, id])
    return res.status(200).send("Dado(s) atualizado(s) com sucesso :)")
  } catch (err) {

    console.log(err)

  }
}