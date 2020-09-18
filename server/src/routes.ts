import express from 'express';
import ContaController from './controller/ContaController';
import CategoriaController from './controller/CategoriaController';
import TransferenciaController from './controller/TransferenciaController';

const contaController = new ContaController();
const categoriaController = new CategoriaController();
const transferenciaController = new TransferenciaController();

const routes = express.Router();

routes.post('/conta', contaController.create);
routes.get('/conta', contaController.index);

routes.post('/categoria', categoriaController.create);
routes.get('/categoria', categoriaController.index);

routes.post('/transf', transferenciaController.create);
routes.get('/transf', transferenciaController.index);

export default routes;

