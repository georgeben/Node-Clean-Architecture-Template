import { makeInvoker } from "awilix-express";
import { Router } from "express";
import TodoController from "interfaces/http/controllers/TodoController";
import CheckAuthentication from "interfaces/http/middleware/checkAuthentication";
import MethodNotAllowedHandler from "middleware/methodNotAllowed";

const router = Router();
const api = makeInvoker(TodoController);
const authPolicy = makeInvoker(CheckAuthentication);

/**
 * @api {get} /todo getAll
 * @apiGroup Todo
 * @apiName getAll
 * @apiDescription Get all todos in the database
 * @apiVersion 1.0.0
 * @apiQuery {String} status - Todo's status
 * @apiSuccessExample Success Response:
 * {
  "success": true,
  "status_code": 200,
  "message": "Todo Fetch Successful!",
  "data": [
    {
      "_id": "63d790bc3339b51d4742df50",
      "status": "incomplete",
      "completed_at": null,
      "subject": "Fishers",
      "note": "default Note",
      "is_important": false,
      "due_date": null,
      "createdAt": "2023-01-30T09:41:16.753Z",
      "updatedAt": "2023-01-30T09:41:16.753Z",
      "__v": 0,
      "id": "63d790bc3339b51d4742df50"
    },
    {
      "_id": "63d79109a0113eb47508f537",
      "status": "incomplete",
      "completed_at": null,
      "subject": "Fishers",
      "note": "default Note",
      "is_important": false,
      "due_date": null,
      "createdAt": "2023-01-30T09:42:33.370Z",
      "updatedAt": "2023-01-30T09:42:33.370Z",
      "__v": 0,
      "id": "63d79109a0113eb47508f537"
    },

  ],
  "links": [
  ]
}
 */

router
  .route("/")
  .get(authPolicy("allowAny"), api("getAll"))
  .all(MethodNotAllowedHandler);

export default router;
