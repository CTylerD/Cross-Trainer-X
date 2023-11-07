class User {
  constructor(user_id, fitness_id, user_data) {
    this.user_id = user_id;
    this.fitness_id = fitness_id;
    this.user_data = user_data;
  }

  // Method to convert the user object to JSON
  toJSON() {
    return {
      user_id: this.user_id,
      fitness_id: this.fitness_id,
      user_data: this.user_data,
    };
  }
}
