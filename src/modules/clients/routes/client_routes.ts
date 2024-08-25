import { Router } from 'express';
import ClientController from '../controllers/ClientController';
import { auth } from '@shared/http/middleweres/auth';
const clienRouter = Router();
const clientController = new ClientController();

clienRouter.use(auth);

clienRouter.get('/', clientController.listClient);

clienRouter.post('/', clientController.createClient);

clienRouter.get('/:name', clientController.showClientByName);
clienRouter.get('/:id', clientController.showClientById);


export default clienRouter;