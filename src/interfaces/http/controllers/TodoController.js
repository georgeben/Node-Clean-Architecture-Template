import { pick } from "lodash";
import BaseController from "./BaseController";

class AuthController extends BaseController {
  constructor({ getTodos }) {
    super();
    this.getTodos = getTodos;
  }

  async getAll(req, res) {
    const payload = pick(req.query, ["status", "subject", "note"]);
    const response = await this.getTodos.execute(payload);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(response, "Todo Fetch Successful!");
  }
}

export default AuthController;
