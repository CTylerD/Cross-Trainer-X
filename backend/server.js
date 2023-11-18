const Auth = require("./src/auth/auth");
const AuthUser = require("./src/auth/user");
const Auth0 = require("./src/auth/auth0Constants");
const ExerciseModel = require("./src/models/exercise");
const WorkoutModel = require("./src/models/workout");
const ExerciseController = require("./src/controllers/exercise");
const WorkoutController = require("./src/controllers/workout");
const HeaderValidation = require("./src/validation/headerValidation");
const ModelValidator = require("./src/validation/modelValidation");
const express = require("express");
const bodyParser = require("body-parser");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

// JWT checker for ensuring authorization on all endpoints
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${Auth0.OAUTH_DOMAIN}/.well-known/jwks.json`,
  }),
  issuer: `https://${Auth0.OAUTH_DOMAIN}/`,
  algorithms: ["RS256"],
});

function handleError(error, res) {
  console.error(error);
  res.status(500).json({ Error: "Internal server error" });
  return
}

// GET / welcome to the app
app.get("/", function (req, res) {
  res.status(200).json({ welcome: "you've got mail!" });
});

/*
###################################
##### AUTHORIZATION ENDPOINTS #####
###################################
*/

// POST /login endpoint which generates a new state and redirects to Auth0 to request an auth code
app.post("/login", (req, res) => {
  try {
    const stateHandler = (error, state) => {
      if (error) {
        handleError(error, res);
        return res.end();
      } else {
        res.redirect(
          `https://${Auth0.OAUTH_DOMAIN}/authorize?response_type=code&client_id=${Auth0.OAUTH_CLIENT_ID}&redirect_uri=${Auth0.URL}/oauth&scope=openid%20profile%20email&state=${state}`
        );
      }
    };

    Auth.createState(stateHandler);
  } catch (e) {
    console.error(e);
  }
});

// GET /oauth endpoint, which verifies the state is valid and requests the JWT using the auth code
app.get("/oauth", async (req, res) => {
  try {
    if (await Auth.stateExists(req.query.state)) {
      const tokenData = await Auth.retrieveJwt(req.query.code);
      const bearerToken = tokenData.id_token;
      const userId = Auth.extractSubFromJwt(bearerToken);
      //AuthUser.addUser(userId);

      const responseData = {
        token: tokenData.id_token,
        token_type: tokenData.token_type,
        expires: tokenData.expires_in,
        user: userId,
      };
      res.json(responseData);
    } else {
      const errorMsg = { Error: "The provided state is invalid. " };
      res.status(400).json(errorMsg);
    }
  } catch (e) {
    handleError(e, res);
  }
});

/*
##############################
##### EXERCISE ENDPOINTS #####
##############################
*/

// POST /exercises endpoint, adds exercise to database
app.post("/exercises", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const newExercise = new ExerciseModel(
      "id",
      req.body.name,
      req.body.type,
      req.body.secondaryType,
      req.body.description,
      Auth.extractSubFromJwt(req.headers.authorization),
      req.body.muscleGroup,
      req.body.equipment,
      req.body.reps,
      req.body.sets,
      req.body.weight,
      req.body.weightClass,
      req.body.rest,
      req.body.duration,
      req.body.distance,
      req.body.difficulty
    );

    if (ModelValidator.exerciseInvalid(newExercise)) {
      res.status(400).json({ Error: "The exercise request data is invalid" });
    } else {
      let responseHandler = (error, data) => {
        try {
          if (error) {
            handleError(error, res);
          } else {
            newExercise.id = data.insertId;
            res.status(201).json(newExercise.toJSON());
          }
        } catch (e) {
          handleError(e, res);
          return res.end();
        }
      };

      ExerciseController.createExercise(newExercise, responseHandler);
    }
  } catch (e) {
    handleError(e, res);
  }
});

// GET /exercises endpoint, retrieves specified exercise from database
app.get("/exercises/:exerciseId", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const responseHandler = (error, exercise) => {      
      try {
        if (error) {
          handleError(error, res);
          return res.end();
        }
        if (!exercise) {
          res
            .status(404)
            .json({ Error: "No exercise with this exerciseId exists" });
          return res.end();
        }

        if (
          exercise.userId != Auth.extractSubFromJwt(req.headers.authorization)
        ) {
          res.status(401).json({
            Error:
              "Access denied: this exercise does not belong to the current user",
          });
          return res.end();
        }
        const newExercise = new ExerciseModel(
          exercise.id,
          exercise.name,
          exercise.type,
          exercise.secondaryType,
          exercise.description,
          exercise.userId,
          exercise.muscleGroup,
          exercise.equipment,
          exercise.reps,
          exercise.sets,
          exercise.weight,
          exercise.weightClass,
          exercise.rest,
          exercise.duration,
          exercise.distance,
          exercise.difficulty
        );

        res.status(200).json(newExercise.toJSON()).end();
      } catch (e) {
        handleError(e, res);
      }
    };

    ExerciseController.getExercise(req.params.exerciseId, responseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /exercises - this endpoint is not allowed
app.put("/exercises/:exerciseId", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /exercises endpoint, updates an exercise
app.patch("/exercises/:exerciseId", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const updatedExercise = new ExerciseModel(
      req.params.exerciseId,
      req.body.name,
      req.body.type,
      req.body.secondaryType,
      req.body.description,
      Auth.extractSubFromJwt(`${req.headers.authorization}`),
      req.body.muscleGroup,
      req.body.equipment,
      req.body.reps,
      req.body.sets,
      req.body.weight,
      req.body.weightClass,
      req.body.rest,
      req.body.duration,
      req.body.distance,
      req.body.difficulty,
      req.body.timesCompleted
    );

    if (ModelValidator.exerciseInvalid(updatedExercise)) {
      res.status(400).json({ Error: "The exercise request data is invalid" });
      return res.end();
    }

    if (
      updatedExercise.userId !=
      Auth.extractSubFromJwt(req.headers.authorization)
    ) {
      res.status(401).json({
        Error:
          "Access denied: this exercise does not belong to the current user",
      });
      return res.end();
    }

    const getResponseHandler = (error, exercise) => {
      if (error) {
        handleError(error, res);
        return res.end();
      }

      if (!exercise) {
        res
          .status(404)
          .json({ Error: "No exercise with this exerciseId exists" });
        return res.end();
      }

      
      let updateResponseHandler = (error, _) => {
        try {
          if (error) {
            handleError(error, res);
          } else {
            res.status(200).json(updatedExercise.toJSON());
            return res.end();
          }
        } catch (e) {
          handleError(e, res);
        }
      }


      ExerciseController.updateExercise(
        req.params.exerciseId,
        updateResponseHandler
      );
    };

    ExerciseController.updateExercise(updatedExercise, getResponseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /exercises endpoint, deletes specified exercise from database
app.delete("/exercises/:exerciseId", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const getResponseHandler = (error, exercise) => {
      if (error) {
        handleError(e, res);
        return res.end();
      }

      if (!exercise) {
        res
          .status(404)
          .json({ Error: "No exercise with this exerciseId exists" });
        return res.end();
      }

      if (
        exercise.userId != Auth.extractSubFromJwt(req.headers.authorization)
      ) {
        res.status(401).json({
          Error:
            "Access denied: this exercise does not belong to the current user",
        });
        return res.end();
      }

      const deleteResponseHandler = (error, _) => {
        try {
          if (error) {
            handleError(error, res);
            return res.end();
          }
          res.status(204).end();
        } catch (e) {
          handleError(e, res);
        }
      };

      ExerciseController.deleteExercise(
        req.params.exerciseId,
        exercise.userId,
        deleteResponseHandler
      );
    };

    ExerciseController.getExercise(req.params.exerciseId, getResponseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// POST /exercises - this endpoint is not allowed
app.post("/exercises", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// GET /exercises endpoint, retrieves all exercises from database
app.get("/exercises", async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    let responseHandler = (error, data) => {
      try {
        if (error) {
          handleError(error, res);
        } else {
          res.status(200).json(data);
        }
      } catch (e) {
        handleError(e, rs);
      }
    };

    ExerciseController.getAllExercises(
      Auth.extractSubFromJwt(req.headers.authorization),
      responseHandler
    );
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /exercises - this endpoint is not allowed
app.patch("/exercises", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /exercises - this endpoint is not allowed
app.put("/exercises", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /exercises - this endpoint is not allowed
app.delete("/exercises", checkJwt, function (req, res) {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});


/*
##############################
##### WORKOUT ENDPOINTS #####
##############################
*/

// POST /workouts endpoint, adds workout to database
app.post("/workouts", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    if (!req.body.exercises) {
      return res
        .status(400)
        .json({
          Error:
            "The request object is missing at least one of the required attributes",
        });
    }

    const getExercise = (exerciseId) => {
      return new Promise((resolve, reject) => {
        ExerciseController.getExercise(exerciseId, (error, exercise) => {
          if (error) {
            reject(error);
          } else {
            resolve(exercise);
          }
        });
      });
    };

    const exercisePromises = req.body.exercises.map(exerciseId => getExercise(exerciseId));

    const exercises = await Promise.all(exercisePromises)
      .then((exercisesData) => {
        const results = {};
        exercisesData.forEach((exercise) => {
          if (exercise) {
            results[`${exercise.id}`] = exercise;
          }
        });
        return results;
      })
      .catch(error => {
        return handleError(error, res);
      });

    for (const exercise in exercises) {
      if (
        exercises[exercise] &&
        exercises[exercise].userId !=
          Auth.extractSubFromJwt(req.headers.authorization)
      ) {
        return res.status(401).json({
          Error:
            "Access denied: one or more of these excercises does not belong to the current user",
        });
      }
    };

    if (!exercises || (req.body.exercises.length != (Object.keys(exercises)).length)) {
      return res.status(404).json({
        Error: "One or more of the exercises in the request do not exist",
      });
    }

    const newWorkout = new WorkoutModel(
      1,
      Auth.extractSubFromJwt(req.headers.authorization),
      exercises,
      null
    );

    if (ModelValidator.workoutInvalid(newWorkout)) {
      return res
        .status(400)
        .json({
          Error:
            "The request object is missing at least one of the required attributes",
        });
    } else {
      let responseHandler = (error, data) => {
        try {
          if (error) {
            handleError(error, res);
          } else {
            newWorkout.id = data.insertId;
            return res.status(201).json(newWorkout.toJSON());
          }
        } catch (e) {
          return handleError(e, res);
        }
      };

      WorkoutController.createWorkout(newWorkout, responseHandler);
    }
  } catch (e) {
    return handleError(e, res);
  }
});

// GET /workouts endpoint, retrieves specified workout from database
app.get("/workouts/:workoutId", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const responseHandler = (error, workout) => {      
      try {
        if (error) {
          handleError(error, res);
          return res.end();
        }
        if (!workout) {
          res
            .status(404)
            .json({ Error: "No workout with this id exists" });
          return res.end();
        }

        if (
          workout.userId != Auth.extractSubFromJwt(req.headers.authorization)
        ) {
          res.status(401).json({
            Error:
              "Access denied: this workout does not belong to the current user",
          });
          return res.end();
        }
        const newWorkout = new WorkoutModel(
          workout.id,
          workout.userId,
          JSON.parse(workout.exercises),
          workout.dateCompleted
        );

        res.status(200).json(newWorkout.toJSON()).end();
      } catch (e) {
        handleError(e, res);
      }
    };

    WorkoutController.getWorkout(req.params.workoutId, responseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /workouts - this endpoint is not allowed
app.put("/workouts/:workoutId", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /workouts endpoint, updates an workout
app.patch("/workouts/:workoutId", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    if (!req.body.exercises) {
      return res.status(400).json({
        Error:
          "The request object is missing at least one of the required attributes",
      });
    }

    const getExercise = (exerciseId) => {
      return new Promise((resolve, reject) => {
        ExerciseController.getExercise(exerciseId, (error, exercise) => {
          if (error) {
            reject(error);
          } else {
            resolve(exercise);
          }
        });
      });
    };

    const exercisePromises = req.body.exercises.map((exerciseId) =>
      getExercise(exerciseId)
    );

    const exercises = await Promise.all(exercisePromises)
      .then((exercisesData) => {
        const results = {};
        exercisesData.forEach((exercise) => {
          if (exercise) {
            results[`${exercise.id}`] = exercise;
          }
        });
        return results;
      })
      .catch((error) => {
        return handleError(error, res);
      });

    for (const exercise in exercises) {
      if (
        exercises[exercise] &&
        exercises[exercise].userId !=
          Auth.extractSubFromJwt(req.headers.authorization)
      ) {
        return res.status(401).json({
          Error:
            "Access denied: one or more of these excercises does not belong to the current user",
        });
      }
    }

    if (
      !exercises ||
      req.body.exercises.length != Object.keys(exercises).length
    ) {
      return res.status(404).json({
        Error: "One or more of the exercises in the request do not exist",
      });
    }

    const updatedWorkout = new WorkoutModel(
      parseInt(req.params.workoutId, 10),
      Auth.extractSubFromJwt(req.headers.authorization),
      exercises,
      null
    );

    if (ModelValidator.workoutInvalid(updatedWorkout)) {
      return res.status(400).json({
        Error:
          "The request object is missing at least one of the required attributes",
      });
    } else {
      let responseHandler = (error, data) => {
        try {
          if (error) {
            handleError(error, res);
          } else {
            return res.status(201).json(updatedWorkout.toJSON());
          }
        } catch (e) {
          return handleError(e, res);
        }
      };

      WorkoutController.updateWorkout(updatedWorkout, responseHandler);
    }
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /workouts endpoint, deletes specified workout from database
app.delete("/workouts/:workoutId", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const getResponseHandler = (error, workout) => {
      if (error) {
        handleError(e, res);
        return res.end();
      }

      if (workout && workout.userId != Auth.extractSubFromJwt(req.headers.authorization)) {
        res.status(401).json({
          Error:
            "Access denied: this workout does not belong to the current user",
        });
        return res.end();
      }

      if (!workout) {
        res
          .status(404)
          .json({ Error: "No workout with this id exists" });
        return res.end();
      }

      const deleteResponseHandler = (error, _) => {
        try {
          if (error) {
            handleError(error, res);
            return res.end();
          }
          res.status(204).end();
        } catch (e) {
          handleError(e, res);
        }
      };

      WorkoutController.deleteWorkout(
        req.params.workoutId,
        workout.userId,
        deleteResponseHandler
      );
    };

    WorkoutController.getWorkout(req.params.workoutId, getResponseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// POST /workouts - this endpoint is not allowed
app.post("/workouts/:exercise_id", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// GET /workouts endpoint, retrieves all workouts from database
app.get("/workouts", async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    let responseHandler = (error, workouts) => {
      try {
        if (error) {
          handleError(error, res);
        } else {
          res.status(200).json(workouts);
        }
      } catch (e) {
        handleError(e, res);
      }
    };

    WorkoutController.getAllWorkouts(
      Auth.extractSubFromJwt(req.headers.authorization),
      responseHandler
    );
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /workouts - this endpoint is not allowed
app.patch("/workouts", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /workouts - this endpoint is not allowed
app.put("/workouts", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /workouts - this endpoint is not allowed
app.delete("/workouts", checkJwt, function (req, res) {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// POST /current_workouts - this endpoint is not allowed
app.post("/current_workout", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});


// GET /workouts endpoint, retrieves specified workout from database
app.get("/current_workout", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const responseHandler = (error, workout) => {      
      try {
        workout = workout ? workout[0] : null;
        if (error) {
          handleError(error, res);
          return res.end();
        }
        if (!workout) {
          res
            .status(404)
            .json({ Error: "No uncompleted workouts exist for this user." });
          return res.end();
        }

        if (
          workout.userId != Auth.extractSubFromJwt(req.headers.authorization)
        ) {
          res.status(401).json({
            Error:
              "Access denied: this workout does not belong to the current user",
          });
          return res.end();
        }
        const newWorkout = new WorkoutModel(
          workout.id,
          workout.userId,
          JSON.parse(workout.exercises),
          workout.dateCompleted
        );

        res.status(200).json(newWorkout.toJSON()).end();
      } catch (e) {
        handleError(e, res);
      }
    };

    WorkoutController.getCurrentWorkout(
      Auth.extractSubFromJwt(req.headers.authorization),
      responseHandler
    );
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /current_workouts - this endpoint is not allowed
app.put("/current_workout", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /current_workouts - this endpoint is not allowed
app.patch("/current_workout", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /current_workouts - this endpoint is not allowed
app.delete("/current_workout", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// POST /workouts/:workoutId/exercises/:exerciseId endpoint, retrieves specified exercise from database
app.post("/workouts/:workoutId/exercises/:exerciseId", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const exerciseResponseHandler = (error, exercise) => {      
      try {
        if (error) {
          handleError(error, res);
          return res.end();
        }
        if (!exercise) {
          res
            .status(404)
            .json({ Error: "No exercise with this exerciseId exists" });
          return res.end();
        }

        if (
          exercise.userId != Auth.extractSubFromJwt(req.headers.authorization)
        ) {
          res.status(401).json({
            Error:
              "Access denied: this exercise does not belong to the current user",
          });
          return res.end();
        }
        const newExercise = new ExerciseModel(
          exercise.id,
          exercise.name,
          exercise.type,
          exercise.secondaryType,
          exercise.description,
          exercise.userId,
          exercise.muscleGroup,
          exercise.equipment,
          exercise.reps,
          exercise.sets,
          exercise.weight,
          exercise.weightClass,
          exercise.rest,
          exercise.duration,
          exercise.distance,
          exercise.difficulty
        );

        res.status(200).json(newExercise.toJSON()).end();
      } catch (e) {
        handleError(e, res);
      }
    };

    ExerciseController.getExercise(
      req.params.exerciseId,
      exerciseResponseHandler
    );
  } catch (e) {
    handleError(e, res);
  }
});

/*
##############################
###### USERS  ENDPOINTS ######
##############################
*/

// GET /users/:user_id - this endpoint gets all of the user information for a specified user
app.get("/users/:user_id", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const newUser = 
      new UserModel(
        Auth.extractSubFromJwt(req.headers.authorization),
        req.body.email,
        req.body.avatarId,
        req.body.firstName,
        req.body.lastName,
        req.body.city,
        req.body.state,
        req.body.age,
        req.body.gender,
        req.body.weight,
        req.body.height,
        req.body.fitnessTrack,
        req.body.secondaryTrack
      ) 
  
    if (ModelValidator.exerciseInvalid(newExercise)) {
      res.status(400).json({ Error: "The exercise request data is invalid" });
    } else {
      let responseHandler = (error, data) => {
        try {
          if (error) {
            handleError(error, res);
          } else {
            res.status(201).json(newUser.toJSON());
          }
        } catch (e) {
          handleError(e, res);
          return res.end();
        }
      };

      ExerciseController.createExercise(newUser, responseHandler);
    }
  } catch (e) {
    handleError(e, res);
  }
});

app.listen(Auth0.PORT, () => {
  console.log(`Server listening on port ${Auth0.PORT}...`);
});
