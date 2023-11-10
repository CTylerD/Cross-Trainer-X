class Workout {
  constructor(id, exercises, date_completed) {
    this.id = id;
    this.exercises = exercises;
    this.date_completed = date_completed;
  }

  // Method to convert the workout object to JSON
  toJSON() {
    return {
      id: this.id,
      exercises: this.exercises,
      date_completed: this.date_completed
    };
  }
}
