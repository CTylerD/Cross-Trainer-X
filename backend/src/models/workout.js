class Workout {
  constructor(id, exercises) {
    this.id = id;
    this.exercises = exercises;
  }

  // Method to convert the workout object to JSON
  toJSON() {
    return {
      id: this.id,
      exercises: this.exercises,
    };
  }
}
