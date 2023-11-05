class Rating {
  constructor(id, weight, reps, difficulty) {
    this.id = id;
    this.weight = weight;
    this.reps = reps;
    this.difficulty = difficulty;
  }

  // Method to convert the rating object to JSON
  toJSON() {
    return {
      id: this.id,
      weight: this.weight,
      reps: this.reps,
      difficulty: this.difficulty,
    };
  }
}
