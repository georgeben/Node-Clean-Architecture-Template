import {
  createContainer, asClass, InjectionMode, Lifetime, asFunction, asValue,
} from "awilix";
import { scopePerRequest } from "awilix-express";
import config from "config";
import MongoDB from "infra/database/MongoDBManager";
import mongodbModels from "infra/database/models";
import logger from "infra/logger";
import routes from "interfaces/http/routes/router";
import httpServer from "interfaces/http/Server";
import StorageService from "infra/storage/Cloudinary";
import PaymentService from "infra/payments/Paystack";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  config: asValue(config),
  db: asClass(MongoDB).singleton(),
  models: asValue(mongodbModels),
  logger: asValue(logger),
  containerMiddleware: asValue(scopePerRequest(container)),
  routes: asFunction(routes),
  httpServer: asClass(httpServer),
  storageService: asClass(StorageService).singleton(),
  paymentService: asClass(PaymentService).singleton(),
});

container.loadModules(
  [
    // Load use-cases
    [
      "app/**/*!(index.js).js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
    // Load repositories
    [
      "infra/repositories/**/*.js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    formatName: "camelCase",
    resolverOptions: {},
    cwd: __dirname,
  },
);

container.loadModules(
  [
    // Load entities
    [
      "domain/entities/*!(index.js).js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    resolverOptions: {},
    cwd: __dirname,
  },
);

export default container;
