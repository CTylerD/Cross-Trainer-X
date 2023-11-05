const Auth = require("./auth/auth");
const User = require("./auth/user");
const Auth0 = require("./auth/auth0_constants");
const express = require("express");
const bodyParser = require("body-parser");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const db = require("./database/db-connector");

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

app.get("/", function (req, res) {
  res.status(200).json({ "welcome": "you've got mail!" });
});

// POST /login endpoint which generates a new state and redirects to Auth0 to request an auth code
app.post("/login", function (req, res) {
  try {
    res.redirect(`https://${Auth0.OAUTH_DOMAIN}/authorize?response_type=code&client_id=${Auth0.OAUTH_CLIENT_ID}&redirect_uri=${Auth0.URL}/oauth&scope=openid%20profile%20email&state=${Auth.generateState()}`);
  } catch (e) {
    throw e;
  }
});

// GET /oauth endpoint, which verifies the state is valid and requests the JWT using the auth code
app.get("/oauth", async (req, res)=> {
  if (await Auth.stateExists(req.query.state)) {
    const token_data = await Auth.retrieveJwt(req.query.code);
    const user_id = Auth.extractSubFromJwt(token_data.id_token);
    User.addUser(user_id);

    const response_data = {
      token: token_data.id_token,
      token_type: token_data.token_type,
      expires: token_data.expires_in,
      user: user_id,
    };
    res.json(response_data);
  } else {
    const error_msg = { Error: "The provided state is invalid. " };
    res.status(400).json(error_msg);
  }
});

app.listen(Auth0.PORT, () => {
  console.log(`Server listening on port ${Auth0.PORT}...`);
});
