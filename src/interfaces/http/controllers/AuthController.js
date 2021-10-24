import { pick } from "lodash";
import BaseController from "./BaseController";

class AuthController extends BaseController {
  constructor({ signup, login }) {
    super();
    this.signupUser = signup;
    this.login = login;
  }

  async signup(req, res) {
    const payload = pick(req.body, ["first_name", "last_name", "email", "password"]);
    const response = await this.signupUser.execute(payload);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(response, "Sign up successful!");
  }

  async handleLogin(req, res) {
    const payload = pick(req.body, ["email", "password"]);
    const response = await this.login.execute(payload);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(response, "Log in successful!");
  }
}

export default AuthController;
