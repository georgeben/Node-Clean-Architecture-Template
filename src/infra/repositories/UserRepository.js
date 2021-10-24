import crypto from "crypto";
import dayjs from "dayjs";
import ConflictError from "interfaces/http/errors/ConflictError";
import password from "helpers/password";
import BaseRepository from "./BaseRepository";

class UserRepository extends BaseRepository {
  constructor({
    models: { User },
  }) {
    super({ Model: User });
    this.User = User;
  }

  async create(payload) {
    if (payload.email) {
      const existingUser = await this.find(
        { email: payload.email },
        { email: 1 },
        { lean: true },
      );
      if (existingUser) {
        throw new ConflictError("An account with this email already exists.");
      }
    }

    const username = await this.User.generateUsername(payload.first_name);
    const hash = await password.hash(payload.password);
    const confirm_email_token = crypto.randomBytes(30).toString("hex");
    const confirm_email_expiry = dayjs().add(7, "day");

    const createdUser = await this.createDoc({
      ...payload,
      password: hash,
      username,
      confirm_email_token,
      confirm_email_expiry,
    });

    /**
     * TODO Send welcome email, email confirmation email, etc. Alternatively, you can publish
     * an event to a queue so other services can respond to a user signing up i.e index user
     * data to an Elastic Search index, send a slack notification, etc
     */

    return createdUser.getPublicFields();
  }
}

export default UserRepository;
