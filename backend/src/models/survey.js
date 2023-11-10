class Survey {
  constructor(id, exerciseId, reps, sets, weight, rest, exercise, duration, distance) {
    this.id = id;
    this.exerciseId = exerciseId;
    this.reps = reps;
    this.weight = weight;
    this.sets = sets;
    this.rest = rest;
    this.exercise = exercise;
    this.duration = duration;
    this.distance = distance;
  }

  // Method to convert the survey object to JSON
  toJSON() {
    return {
      id: this.id,
      exerciseId: this.exerciseId,
      reps: this.reps,
      weight: this.weight,
      sets: this.sets,
      rest: this.rest,
      exercise: this.exercise,
      duration: this.duration,
      distance: this.distance,
    };
  }
}
