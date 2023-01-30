import BaseRepository from './BaseRepository';

class UserRepository extends BaseRepository {
  constructor({ models: { Todo } }) {
    super({ Model: Todo });
    this.Todo = Todo;
  }

  async get(payload) {
    const todos = await this.find(payload, null, {}, true);
    return todos;
  }
}

export default UserRepository;
