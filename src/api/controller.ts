import { loggers } from 'winston';
import db from './../loaders/database';
import logger from './../loaders/logger';
import { customAlphabet } from 'nanoid';
import { permittedCrossDomainPolicies } from 'helmet';
import database from './../loaders/database';
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 4);

let d;
let obj: object = {};

export const showAllPets = async () => {
    try {
        let petData = await (await db()).collection('petstore').find({}).toArray();
        let array: object[] = [];

        for (let i = 0; i < petData.length; i++) {
            d = petData[i];
            let { _id, ...data } = d;
            obj = {
                ...data,
            };
            array[i] = obj;
        }
        return array;
    } catch (error) {
        logger.error(error);
        throw { code: 500, message: 'could not display pets' };
    }
};

export const addPet = async (data: object, owner, pet) => {
    try {
        let check = await (await db()).collection('petstore').find({ owner: owner }).toArray();
        let flag = false;
        for (let i = 0; i < check.length; i++) {
            if (check[i].pet === pet) {
                flag = true;
            }
        }
        if (flag) {
            throw { code: 400, message: 'pet already exists' };
        }

        let tag = 'SPS-' + nanoid(); //this adds a unique tag/id for everypet. SPS stands for Shashank's pet store.
        let finalData = {
            ...data,
            tag: tag,
        };
        await (await db()).collection('petstore').insertOne(finalData);
        return finalData.tag;
    } catch (error) {
        logger.error(error);
        if (error.code === 400) throw error;
        throw { code: 500, message: 'could not add a new pet' };
    }
};

export const show = async (tag: string) => {
    try {
        let pet = await (await db()).collection('petstore').findOne({ tag: tag });
        if (pet === null) {
            throw { code: 404, message: 'does not exist' };
        }
        let { _id, ...data } = pet;
        obj = {
            ...data,
        };
        return obj;
    } catch (error) {
        logger.error(error);
        if (error.code === 404) throw error;
        throw { error: 500, message: 'could not display pet name' };
    }
};

export const update = async (petdata, tag) => {
    try {
        let data = await (await db()).collection('petstore').findOne({ tag: tag });
        if (data === null) {
            throw { code: 404, message: 'Pet data not found' };
        }
        await (await db()).collection('petstore').replaceOne({ tag: tag }, petdata);
    } catch (error) {
        if (error.code === 404) throw error;
        throw { code: 500, message: 'could not update the skill' };
    }
};

export const deletePet = async tag => {
    try {
        if ((await (await db()).collection('petstore').findOne({ tag: tag })) === null) {
            throw { code: 404, message: 'Pet data not found' };
        }
        await (await db()).collection('petstore').deleteOne({ tag: tag });
    } catch (error) {
        if (error.code === 404) throw error;
        throw { code: 500, message: 'could not delete the pet data' };
    }
};

export const ownerAllPets = async (owner: string) => {
    try {
        if ((await (await db()).collection('petstore').findOne({ owner: owner })) === null) {
            throw { code: 404, message: 'Pet data not found' };
        }
        let ownerpets = await (await db()).collection('petstore').find({ owner: owner }).toArray();
        let array = [];
        for (let i = 0; i < ownerpets.length; i++) {
            let { _id, owner, ownerphone, owneremail, ...data } = ownerpets[i];
            obj = {
                ...data,
            };
            array[i] = obj;
        }
        return obj;
    } catch (error) {
        logger.error(error);
        if (error.code === 404) throw error;
        throw { code: 500, message: 'Could not display all pets of an owner' };
    }
};

export const ownerOfPet = async (pet, tag) => {
    try {
        let data = await (await db()).collection('petstore').find({ pet: pet }).toArray();
        let obj: object = {};
        let array: object = [];
        for (let i = 0; i < data.length; i++) {
            obj = {
                owner: data[i].owner,
                ownerphone: data[i].ownerphone,
                owneremail: data[i].owneremail,
                tag: data[i].tag,
            };
            array[i] = obj;
        }
        let objSend = {
            pet: pet,
            array: array,
        };
        return array;
    } catch (error) {
        throw { code: 500, message: 'Could not display owner of a pet' };
    }
};

export const allOwners = async () => {
    try {
        let array: Array<object> = [];
        let data = await (await db()).collection('petstore').find({}).toArray();
        for (let i = 0; i < data.length; i++) {
            array[i] = {
                owner: data[i].owner,
                ownerphone: data[i].ownerphone,
                owneremail: data[i].owneremail,
                tag: data[i].tag,
            };
        }
        return array;
    } catch (error) {
        throw { code: 500, message: 'could not view all owners' };
    }
};
