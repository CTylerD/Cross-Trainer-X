class Survey {
  constructor(id, exerciseId, userId, dateTime, reps = null, sets = null, weight = null, rest = null, difficulty = null, duration = null, distance = null) {
    this.id = id;
    this.exerciseId = exerciseId;
    this.userId = userId;
    this.dateTime = dateTime;
    this.reps = reps;
    this.weight = weight;
    this.sets = sets;
    this.rest = rest;
    this.difficulty = difficulty;
    this.duration = duration;
    this.distance = distance;
  }

  // Method to convert the survey object to JSON
  toJSON() {
    return {
      id: this.id,
      exerciseId: this.exerciseId,
      userId: this.userId,
      dateTime: this.dateTime,
      reps: this.reps,
      weight: this.weight,
      sets: this.sets,
      rest: this.rest,
      difficulty: this.difficulty,
      duration: this.duration,
      distance: this.distance,
    };
  }
}

module.exports = Survey;
