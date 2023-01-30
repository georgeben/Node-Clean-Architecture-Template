import config from "config";
import TodoModel from "infra/database/models/TodoModel";
import MongoDBManager from "infra/database/MongoDBManager";
import logger from "infra/logger";
import todoSeed from "../infra/database/seeders/todos.json";

const db = new MongoDBManager({ config, logger });

async function createSampleTodos() {
  await TodoModel.create(todoSeed);

  logger.info("Finished creating sample todo(s)");
}

(async function run() {
  logger.info("Running seed script");
  try {
    await db.connect();
    await Promise.all([createSampleTodos()]);

    await db.close();
    logger.info("Finished running seed script");
  } catch (error) {
    logger.error("An error occurred while seeding the database", {
      error: error.message || error.toString(),
      stack: error.stack,
    });
  }
}());
