import BaseRepository from "./BaseRepository";

class RoleRepository extends BaseRepository {
  constructor({ models: { Role } }) {
    super({ Model: Role });
  }
}

export default RoleRepository;
