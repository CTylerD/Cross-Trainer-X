class FitnessPlan {
  constructor(fitness_id, workouts, current_workout, user_id) {
    this.fitness_id = fitness_id;
    this.workouts = workouts;
    this.current_workout = current_workout;
    this.user_id = user_id;
  }

  toJSON() {
    return {
      fitness_id: this.fitness_id,
      workouts: this.workouts,
      current_workout: this.current_workout,
      user_id: this.user_id,
    };
  }
}
