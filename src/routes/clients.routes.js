import {Router} from "express"
import { newCustomer, showCustomer, showCustomers, updateCustomer } from "../controllers/clients.controllers.js";
import { newCustomerSchema, updateCustomerSchema } from "../schemas/clients.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const clientsRouter = Router();

clientsRouter.post("/customers", validateSchema(newCustomerSchema), newCustomer)
clientsRouter.get("/customers", showCustomers)
clientsRouter.get("/customers/:id", showCustomer)
clientsRouter.put("/customers/:id", validateSchema(newCustomerSchema), updateCustomer)

export default clientsRouter;