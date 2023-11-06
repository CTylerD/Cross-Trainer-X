const ExerciseModel = require("../src/models/exercise");
const ExerciseController = require("../src/controllers/exercise");
const Validation = require("../src/validation/modelValidation");

describe("Validation.exerciseInvalid function", () => {
  test("valid Strength exercise data", () => {
    const validStrengthExercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(validStrengthExercise)).toEqual(false);
  });

  test("valid Cardio exercise data", () => {
    const validCardioExercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Cardio",
      "Description",
      "UserId",
      "MuscleGroup",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      120,
      5,
      undefined
    );
    expect(Validation.exerciseInvalid(validCardioExercise)).toEqual(false);
  });

  test("valid Flexibility exercise data", () => {
    const validFlexibilityExercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Flexibility",
      "Description",
      "UserId",
      "MuscleGroup",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      60,
      undefined,
      3
    );
    expect(Validation
      .exerciseInvalid(validFlexibilityExercise)).toEqual(false);
  });

  test('missing required property "Name"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "Strength",
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "userId"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      "Description",
      123,
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      60,
      120,
      undefined,
      undefined
    );
    console.log(typeof exercise.userId);
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('missing required property "name"', () => {
    const exercise = new ExerciseModel(
      "Id",
      undefined,
      "Strength",
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('missing required property "type"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      undefined,
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('missing required property "description"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      undefined,
      123,
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('missing required property "userId"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      "Description",
      undefined,
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "muscleGroup"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      "Description",
      "UserId",
      456,
      "Equipment",
      10,
      3,
      50,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "equipment"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      "Description",
      "UserId",
      "MuscleGroup",
      789,
      10,
      3,
      50,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "reps"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      "10",
      3,
      50,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "sets"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      "3",
      50,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "weight"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      "50",
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "rest"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      "60",
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "duration"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Cardio",
      "Description",
      "UserId",
      "MuscleGroup",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "120",
      5,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "distance"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Cardio",
      "Description",
      "UserId",
      "MuscleGroup",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      120,
      "5",
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "difficulty"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Flexibility",
      "Description",
      "UserId",
      "MuscleGroup",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      60,
      undefined,
      "3"
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });
});
