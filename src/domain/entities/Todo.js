/**
 https://mongoosejs.com/docs/4.x/docs/advanced_schemas.html
 *A class method maps to a schema method, a static method maps to a schema static,
 and getters/setters map to virtuals.
*/

class Todo {
  getPublicFields() {
    return {
      subject: this.subject,
      note: this.note,
      status: this.status,
      _id: this._id,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default Todo;
