import { Router, Request, Response } from 'express';
import { showAllPets, addPet, show, update } from './controller';

const app = Router();

export const routerHandler = () => {
  app.get('/showallpets', showAllPetsHandler);
  app.post('/add', addPetHandler);
  app.get('/show', showHandler);
  app.put('/updatepet', updateHandler);
  return app;
};

const showAllPetsHandler = async (req: Request, res: Response) => {
  showAllPets()
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

const showHandler = async (req: Request, res: Response) => {
  show(req.body.owner as string)
    .then(pet => {
      res.json({ success: true, message: 'pet displayed successfully', pet: pet });
    })
    .catch(error => {
      res.status(error.code).json({ message: error.message, success: false });
    });
};

const updateHandler = async (req: Request, res: Response) => {
  update(req.body, req.body.owner)
    .then(() => {
      res.json({ success: true, message: 'pet updated successfully' });
    })
    .catch(error => {
      res.status(error.code).json({ message: error.message, success: false });
    });
};
