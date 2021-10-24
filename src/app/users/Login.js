import UseCase from "app/UseCase";
import jwt from "helpers/jwt";
import Password from "helpers/password";
import UnauthorizedError from "interfaces/http/errors/Unauthorized";

class Login extends UseCase {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  /**
   * Login for logging in
   */
  async execute({ email, password }) {
    const user = await this.userRepository.find({ email });
    if (!user) {
      throw new UnauthorizedError("Invalid email/password");
    }

    const match = await Password.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedError("Invalid email/password");
    }
    const token = jwt.generate({ userId: user._id, type: "user" });
    return {
      token,
      user: user.getPublicFields(),
    };
  }
}

export default Login;
