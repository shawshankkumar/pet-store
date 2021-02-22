import { Router, Request, Response } from 'express';
import { showAllPets, addPet, show, update, deletePet, ownerAllPets, ownerOfPet, allOwners } from './controller';

const app = Router();

export const routerHandler = () => {
    app.get('/showall', showAllPetsHandler); //to display all pets and their information
    app.post('/add', addPetHandler); //to add a pet
    app.get('/show', showHandler); //to show pet (uses their tag, not the owner name)
    app.put('/update', updateHandler); //update information about a pet
    app.delete('/delete', deleteHandler); //delete a pet from the petstore Database
    app.get('/ownerallpets', ownerAllPetsHandler); //display all pets of an owner
    app.get('/ownerofpet', ownerOfPetHandler); //display owner of a pet. Tag is also displayed just in case multiple pets have the same name
    app.get('/allowners', allOwnersHandler);
    app.get('*', fourOfour);
    app.put('*', fourOfour);
    app.post('*', fourOfour);
    app.delete('*', fourOfour);
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
    deletePet(req.body.tag as string, req.body.owner as string)
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

const ownerOfPetHandler = async (req: Request, res: Response) => {
    ownerOfPet(req.body.pet, req.body.tag)
        .then(owner => {
            res.json({ success: true, message: 'owner displayed', owner: owner });
        })
        .catch(error => {
            res.status(error.code).json({ message: error.message, success: false });
        });
};

const allOwnersHandler = async (req: Request, res: Response) => {
    allOwners()
        .then(all => {
            res.json({ success: true, message: 'All users displayed', ownerlist: all });
        })
        .catch(error => {
            res.status(error.code).json({ success: false, message: error.message });
        });
};

const fourOfour = async (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message:
            'Hi there. This is not a valid route/http request. Please check available routes and http requests in the documentation on github.com/shawshankkumar/pet-store',
    });
};
