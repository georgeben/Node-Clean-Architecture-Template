import { expect } from "chai";
import User from "../User";

describe("********** User entity ***********", () => {
  it("getPublicFields", () => {
    const user = new User({
      first_name: "Peter",
      last_name: "Griffin",
      email: "peter@giffin.com",
      password: "Griffin'sPassword",
      confirm_email_token: "secret",
    });

    const publicFields = user.getPublicFields();
    expect(publicFields).to.be.an("object");
    expect(publicFields).to.not.have.property("password");
  });

  it("generateUsername if unique", async () => {
    User.countDocuments = async () => 0;
    const name = "george";
    const username = await User.generateUsername(name);
    expect(username).to.be.a("string");
    expect(username).to.equal(name);
  });

  it("generateUsername if not unique", async () => {
    User.countDocuments = async ({ username }) => username === "peter";
    const name = "peter";
    const username = await User.generateUsername(name);
    expect(username).to.be.a("string");
    expect(username).to.not.equal(name);
    expect(username).to.contain.oneOf([name]);
  });
});
