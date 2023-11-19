const db = require("../database/db-connector");
const UserModel = require("../models/user");

async function createUser(user, callback) {
  try {
    const addUserQuery = `INSERT INTO Users (user_id, email, avatar_id, first_name, last_name, city, state, age, gender, weight, height, fitness_track, secondary_track)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    db.pool.query(
      addUserQuery,
      [
        user.userId,
        user.email,
        user.avatarId,
        user.firstName,
        user.lastName,
        user.city,
        user.state,
        user.age,
        user.gender,
        user.weight,
        user.height,
        user.fitnessTrack,
        user.secondaryTrack
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

async function getUser(userId, callback) {
  try {
    const getUserQuery = `SELECT
        id,
        user_id AS userId,
        email,
        avatar_id AS avatarId,
        first_name AS firstName,
        last_name AS lastName,
        city,
        state,
        age,
        gender,
        weight,
        height,
        fitness_track AS fitnessTrack,
        secondary_track AS secondaryTrack
      FROM
          Users
      WHERE
          user_id = ?;`;
    db.pool.query(getUserQuery, [userId], (error, rows, fields) => {
      callback(error, rows[0]);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getAllUsers(userId, callback) {
  try {
    const getAllUsersQuery = `SELECT
        id,
        user_id AS userId,
        email,
        avatar_id AS avatarId,
        first_name AS firstName,
        last_name AS lastName,
        city,
        state,
        age,
        gender,
        weight,
        height,
        fitness_track AS fitnessTrack,
        secondary_track AS secondaryTrack
      FROM
        Users
      ;`
    db.pool.query(getAllUsersQuery, [userId], (error, rows, fields) => {
      let responseUsers = [];

      rows.forEach((user) => {
        responseUsers.push(
          new UserModel(
            user.id,
            user.userId,
            user.email,
            user.avatarId,
            user.firstName,
            user.lastName,
            user.city,
            user.state,
            user.age,
            user.gender,
            user.weight,
            user.height,
            user.fitnessTrack,
            user.secondaryTrack
          )
        );
      });

      callback(error, responseUsers);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

function updateUser(user, callback) {
  try {
    const updateUserQuery = `
      UPDATE Users 
      SET email = ?,
          avatar_id = ?,
          first_name = ?,
          last_name = ?,
          city = ?,
          state = ?,
          age = ?,
          gender = ?,
          weight = ?,
          height = ?,
          fitness_track = ?,
          secondary_track = ?
      WHERE user_id = ?;
    `;

    db.pool.query(
      updateUserQuery,
      [
        user.email,
        user.avatarId,
        user.firstName,
        user.lastName,
        user.city,
        user.state,
        user.age,
        user.gender,
        user.weight,
        user.height,
        user.fitnessTrack,
        user.secondaryTrack,
        user.userId
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

function deleteUser(userId, callback) {
  try {
    const deleteUserId = `
    DELETE FROM Users WHERE user_id = ?`;
    db.pool.query(deleteUserId, [userId], (error, rows, fields) => {
        callback(error, rows);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
