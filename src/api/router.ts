import { Router, Request, Response } from 'express';
import { showAllPets, addPet, show, update, deletePet, ownerAllPets } from './controller';

const app = Router();

export const routerHandler = () => {
  app.get('/showallpets', showAllPetsHandler);
  app.post('/add', addPetHandler);
  app.get('/show', showHandler);
  app.put('/update', updateHandler);
  app.delete('/delete', deleteHandler);
  app.get('/ownerallpets', ownerAllPetsHandler);
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
  addPet(req.body as object, req.body.owner as string, req.body.pet as string)
    .then(tag => {
      res.json({ success: true, message: 'added successfully', tag: tag });
    })
    .catch(error => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};

const showHandler = async (req: Request, res: Response) => {
  show(req.body.tag as string)
    .then(pet => {
      res.json({ success: true, message: 'pet displayed successfully', pet: pet });
    })
    .catch(error => {
      res.status(error.code).json({ message: error.message, success: false });
    });
};

const updateHandler = async (req: Request, res: Response) => {
  update(req.body, req.body.tag)
    .then(() => {
      res.json({ success: true, message: 'pet updated successfully' });
    })
    .catch(error => {
      res.status(error.code).json({ message: error.message, success: false });
    });
};

const deleteHandler = async (req: Request, res: Response) => {
  deletePet(req.body.tag as string)
    .then(() => {
      res.json({ success: true, message: 'pet deleted' });
    })
    .catch(error => {
      res.status(error.code).json({ message: error.message, success: false });
    });
};

const ownerAllPetsHandler = async (req: Request, res: Response) => {
  ownerAllPets(req.body.owner as string)
    .then(pets => {
      res.json({ success: true, message: 'all pets of an owner displayed', pets });
    })
    .catch(error => {
      res.status(error.code).json({ message: error.message, success: false });
    });
};
