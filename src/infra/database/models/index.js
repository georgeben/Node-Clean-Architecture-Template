/**
 * Automatically loads all models and exports them
 */
import fs from "fs";
import path from "path";

// eslint-disable-next-line no-underscore-dangle
const _require = require;

const getModel = (file) => _require(path.join(__dirname, file)).default;
const models = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== path.basename(__filename) && path.extname(file) === ".js")
  .forEach((file) => {
    const model = getModel(file);
    models[model.modelName] = model;
  });

export default models;
