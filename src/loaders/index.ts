import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import fs from 'fs';
import path from 'path';
import Logger from './logger';
import './events';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const fsPromises = fs.promises;
  const modelFiles = await fsPromises.readdir(path.join(__dirname, '../models'));
  const models = modelFiles.map(m => {
    const modelName = m.replace('.model.ts', '');
    return {
      name: `${modelName}Model`,
      model: require(`../models/${modelName}.model`).default,
    };
  });

  await dependencyInjectorLoader({
    mongoConnection,
    models: [...models],
  });

  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });

  Logger.info('✌️ Express loaded');
};
