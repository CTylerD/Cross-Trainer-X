function exerciseInvalid(exercise) {
  const idValid = exercise.id && typeof exercise.id === "string";
  const nameValid = exercise.name && typeof exercise.name === "string";
  const typeValid = exercise.type && typeof exercise.type === "string";
  const descriptionValid =
    exercise.description && typeof exercise.description === "string";
  const userIdValid = exercise.userId && typeof exercise.userId === "string";

  switch (exercise.type) {
    case "Strength":
      const muscleGroupValid =
        exercise.muscleGroup && typeof exercise.muscleGroup === "string";
      const equipmentValid =
        exercise.equipment && typeof exercise.equipment === "string";
      const repsValid =
        typeof exercise.reps === "number" && Number.isInteger(exercise.reps);
      const setsValid =
        typeof exercise.sets === "number" && Number.isInteger(exercise.sets);
      const weightValid =
        typeof exercise.weight === "number" &&
        Number.isInteger(exercise.weight);
      const restValid =
        typeof exercise.rest === "number" && Number.isInteger(exercise.rest);

      if (
        idValid &&
        nameValid &&
        typeValid &&
        descriptionValid &&
        userIdValid &&
        muscleGroupValid &&
        equipmentValid &&
        repsValid &&
        setsValid &&
        weightValid &&
        restValid
      ) {
        return false;
      }
    case "Cardio":
      const cardioDurationValid =
        typeof exercise.duration === "number" &&
        Number.isInteger(exercise.duration);
      const distanceValid =
        typeof exercise.distance === "number" &&
        Number.isInteger(exercise.distance);

      if (
        idValid &&
        nameValid &&
        typeValid &&
        descriptionValid &&
        userIdValid &&
        cardioDurationValid &&
        distanceValid
      ) {
        return false;
      }
    case "Flexibility":
      const flexDurationValid =
        typeof exercise.duration === "number" &&
        Number.isInteger(exercise.duration);
      const difficultyValid =
        typeof exercise.difficulty === "number" &&
        Number.isInteger(exercise.difficulty);

      if (
        idValid &&
        nameValid &&
        typeValid &&
        descriptionValid &&
        userIdValid &&
        flexDurationValid &&
        difficultyValid
      ) {
        return false;
      }
    default:
      return true;
  }
}

module.exports = {
  exerciseInvalid
};