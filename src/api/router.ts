import { Router, Request, Response } from 'express';
import { showAll, addPet } from './controller';

const app = Router();

export const routerHandler = () => {
  app.get('/showall', showAllHandler);
  app.post('/add', addPetHandler);
  return app;
};

const showAllHandler = async (req: Request, res: Response) => {
  showAll()
    .then(allPets => {
      res.json({ success: true, message: 'all pets displayed successfully', allPets });
    })
    .catch(error => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};

const addPetHandler = async (req: Request, res: Response) => {
  addPet(req.body as object)
    .then(() => {
      res.json({ success: true, message: 'added successfully' });
    })
    .catch(error => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};
