import UseCase from "app/UseCase";

class Signup extends UseCase {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  execute(payload) {
    // Implement any logic needed for signing up
    return this.userRepository.create(payload);
  }
}

export default Signup;
