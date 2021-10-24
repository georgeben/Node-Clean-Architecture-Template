import fs from "fs";
import path from "path";
import { Router } from "express";

// eslint-disable-next-line no-underscore-dangle
const _require = require;

const router = Router();

// Automatically loads all your routes and export them
fs.readdirSync(__dirname)
  .filter((file) => file !== path.basename(__filename) && path.extname(file) === ".js")
  .forEach((file) => {
    const endpoint = `/${file.split(".js")[0]}`;
    const route = _require(path.join(__dirname, file)).default;
    router.use(endpoint, route);
  });

export default router;
