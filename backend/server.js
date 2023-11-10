const Auth = require("./src/auth/auth");
const AuthUser = require("./src/auth/user");
const Auth0 = require("./src/auth/auth0Constants");
const ExerciseModel = require("./src/models/exercise");
const ExerciseController = require("./src/controllers/exercise");
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
  return;
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
app.post("/login", function (req, res) {
  try {
    res.redirect(
      `https://${Auth0.OAUTH_DOMAIN}/authorize?response_type=code&client_id=${
        Auth0.OAUTH_CLIENT_ID
      }&redirect_uri=${
        Auth0.URL
      }/oauth&scope=openid%20profile%20email&state=${Auth.generateState()}`
    );
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
app.post("/exercises", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const newExercise = new ExerciseModel(
      "id",
      req.body.name,
      req.body.type,
      req.body.description,
      Auth.extractSubFromJwt(req.headers.authorization),
      req.body.muscleGroup,
      req.body.equipment,
      req.body.reps,
      req.body.sets,
      req.body.weight,
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
        }
      };

      ExerciseController.createExercise(newExercise, responseHandler);
    }
  } catch (e) {
    handleError(e, res);
  }
});

// GET /exercises endpoint, retrieves specified exercise from database
app.get("/exercises/:exerciseId", checkJwt, (req, res) => {
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

        res.status(200).json(exercise).end();
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
app.put("/exercises/:exerciseId", checkJwt, function (req, res) {
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
      req.body.description,
      Auth.extractSubFromJwt(`${req.headers.authorization}`),
      req.body.muscleGroup,
      req.body.equipment,
      req.body.reps,
      req.body.sets,
      req.body.weight,
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
          res.status(204).end();
        } catch (e) {
          handleError(e, res);
        }
      };

      ExerciseController.deleteExercise(
        req.params.exerciseId,
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
app.patch("/exercises", checkJwt, function (req, res) {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /exercises - this endpoint is not allowed
app.put("/exercises", checkJwt, function (req, res) {
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

app.listen(Auth0.PORT, () => {
  console.log(`Server listening on port ${Auth0.PORT}...`);
});
