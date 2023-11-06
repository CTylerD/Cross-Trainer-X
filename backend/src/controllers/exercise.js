const db = require("../database/db-connector");
const util = require("util");
const ExerciseModel = require("../models/exercise");

async function createExercise(exercise, callback) {
  try {
    const addExerciseQuery = `INSERT INTO Exercises (name, type, description, user_id, muscle_group, equipment, reps, sets, weight, rest, duration, distance, difficulty)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    db.pool.query(
      addExerciseQuery,
      [
        exercise.name,
        exercise.type,
        exercise.description,
        exercise.userId,
        exercise.muscleGroup,
        exercise.equipment,
        exercise.reps,
        exercise.sets,
        exercise.weight,
        exercise.rest,
        exercise.duration,
        exercise.distance,
        exercise.difficulty,
      ],
      (error, rows, fields) => {
        callback(error, rows);
      }
    );
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getExercise(exerciseId, callback) {
  try {
    const getExerciseQuery = `SELECT * FROM Exercises WHERE id = ?`;
    db.pool.query(getExerciseQuery, [exerciseId], (error, rows, fields) => {
      const exercise = rows.length === 1 ? rows[0] : null

      const responseExercise = exercise ? new ExerciseModel(
        exercise.id,
        exercise.name,
        exercise.type,
        exercise.description,
        exercise.user_id,
        exercise.muscle_group,
        exercise.equipment,
        exercise.reps,
        exercise.sets,
        exercise.weight,
        exercise.rest,
        exercise.duration,
        exercise.distance,
        exercise.difficulty,
        exercise.times_completed
      ) : null;

      callback(error, responseExercise);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getAllExercises(userId, callback) {
  try {
    let queryExercises = "SELECT * FROM Exercises WHERE user_id = ?;";
    db.pool.query(queryExercises, [userId], (error, rows, fields) => {      
      let responseExercises = [];

      rows.forEach((exercise) => {
        responseExercises.push(
          new ExerciseModel(
            exercise.id,
            exercise.name,
            exercise.type,
            exercise.description,
            exercise.user_id,
            exercise.muscle_group,
            exercise.equipment,
            exercise.reps,
            exercise.sets,
            exercise.weight,
            exercise.rest,
            exercise.duration,
            exercise.distance,
            exercise.difficulty,
            exercise.times_completed
          )
        );
      })

      callback(error, responseExercises);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

function updateExercise(exercise, callback) {
  try {
    const updateExerciseQuery = `
      UPDATE Exercises 
      SET name = ?, 
          type = ?, 
          description = ?, 
          user_id = ?, 
          muscle_group = ?, 
          equipment = ?, 
          reps = ?, 
          sets = ?, 
          weight = ?, 
          rest = ?, 
          duration = ?, 
          distance = ?, 
          difficulty = ?, 
          times_completed = ?
      WHERE id = ?;
    `;

    db.pool.query(
      updateExerciseQuery,
      [
        exercise.name,
        exercise.type,
        exercise.description,
        exercise.userId,
        exercise.muscleGroup,
        exercise.equipment,
        exercise.reps,
        exercise.sets,
        exercise.weight,
        exercise.rest,
        exercise.duration,
        exercise.distance,
        exercise.difficulty,
        exercise.timesCompleted,
        exercise.id, // Assuming you have an 'id' property in the exercise object
      ],

      (error, rows, fields) => {
        callback(error, rows);
      }
    );
  } catch (e) {
    console.error(e);
    return e;
  }
}


function deleteExercise(exerciseId, callback) {
  try {
    const deleteExerciseQuery = `
      DELETE FROM Exercises
      WHERE id = ?;
    `;

    db.pool.query(deleteExerciseQuery, [exerciseId], (error, rows, fields) => {
      callback(error, rows);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}


module.exports = {
  createExercise,
  getExercise,
  getAllExercises,
  updateExercise,
  deleteExercise,
};
