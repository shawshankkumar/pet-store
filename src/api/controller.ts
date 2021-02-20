import { loggers } from 'winston';
import db from './../loaders/database';
import logger from './../loaders/logger';
export const showAll = async () => {
  try {
    let petData = await (await db()).collection('petstore').find({}).toArray();
    return petData;
  } catch (error) {
    logger.error(error);
    throw { code: 500, message: 'could not display pets' };
  }
};

export const addPet = async data => {
  try {
    await (await db()).collection('petstore').insertOne(data);
  } catch (error) {
    logger.error(error);
    throw { code: 500, message: 'could not add a new pet' };
  }
};
