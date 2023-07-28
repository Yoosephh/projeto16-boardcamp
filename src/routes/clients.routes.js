import {Router} from "express"
import { newCustomer, showCustomer, showCustomers, updateCustomer } from "../controllers/clients.controllers.js";
import { newCustomerSchema } from "../schemas/clients.schema.js";

const clientsRouter = Router();

clientsRouter.post("/customers",newCustomerSchema, newCustomer)
clientsRouter.get("/customers", showCustomers)
clientsRouter.get("/customers/:id", showCustomer)
clientsRouter.put("/customers/:id", newCustomerSchema, updateCustomer)

export default clientsRouter;