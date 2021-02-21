import { loggers } from 'winston';
import db from './../loaders/database';
import logger from './../loaders/logger';

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

export const addPet = async (data: string) => {
  try {
    await (await db()).collection('petstore').insertOne(data);
  } catch (error) {
    logger.error(error);
    throw { code: 500, message: 'could not add a new pet' };
  }
};

export const show = async (owner: string) => {
  try {
    let pet = await (await db()).collection('petstore').findOne({ owner: owner });
    let { _id, ...data } = pet;
    obj = {
      ...data,
    };
    return obj;
  } catch (error) {
    logger.error(error);
    throw { error: 500, message: 'could not display pet name' };
  }
};

export const update = async (petdata, owner) => {
  try {
    if ((await (await db()).collection('petstore').findOne({ owner: owner })) === null) {
      throw { code: 404, message: 'Pet data not found' };
    }
    await (await db()).collection('petstore').updateOne({ owner: owner }, petdata);
  } catch (error) {
    if (error.code === 404) throw error;
    throw { code: 500, message: 'could not update the skill' };
  }
};
