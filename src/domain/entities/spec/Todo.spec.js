import { expect } from "chai";
import Todo from "../Todo";

describe("********** Todo entity ***********", () => {
  it("getPublicFields", () => {
    const todo = new Todo({
      subject: "Add Caching to Template",
      note: "Add caching with Redis to Node Clean Architecture",
    });

    const publicFields = todo.getPublicFields();
    expect(publicFields).to.be.an("object");
    expect(publicFields).to.have.property("subject");
  });
});
