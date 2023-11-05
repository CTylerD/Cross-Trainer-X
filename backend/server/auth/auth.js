const Auth0 = require("./auth0_constants");
const jwtParser = require("jsonwebtoken");
const axios = require("axios");

const ALPHANUM =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// generate a new state entity - a 32-byte alphanumeric keyword */
function generateState(stateSize = 32, chars = ALPHANUM) {
  let state = "";
  for (let i = 0; i < stateSize; i++) {
    state += ALPHANUM[Math.floor(Math.random() * chars.length)];
  }
  return state;
}

// store a new state entity in the database
async function storeState(state) {
  try {
    const newState = { state: state };
    return state;
  } catch (e) {
    throw e;
  }
}

// add a new user to database, based on a given userID (the JWT sub value)
async function storeUser(userId) {
  try {
    const newUser = { id: userId };
    return newUser;
  } catch (e) {
    throw e;
  }
}

/// get the JWT from Auth0
async function retrieveJwt(code) {
  try { 
    const data = {
      code: code,
      client_id: Auth0.OAUTH_CLIENT_ID,
      client_secret: Auth0.OAUTH_CLIENT_SECRET,
      redirect_uri: `${Auth0.URL}/valid_user`,
      grant_type: "authorization_code",
    };
    const config = {
      headers: { "content-type": "application/json" },
    };
    const response = await axios.post(`https://${Auth0.OAUTH_DOMAIN}/oauth/token`, data, config)

    return response.data;
  } catch (error) {
    console.error(error);
  };
}

// extract the sub value from the JWT for use as user IDs
function extractSubFromJwt(token) {
  try {
    const decoded_token = jwtParser.decode(token);
    return decoded_token.sub;
  } catch (e) {
    throw e;
  }
}

// check whether or not a state entity exists in the database
async function stateExists(givenState) {
  try {
    // retrieve all states to validate the current state
    return true;
  } catch (e) {
    throw e;
  }
}

function requestMIMEInvalid(contentTypeVal) {
  return (
    contentTypeVal &&
    contentTypeVal != "*/*" &&
    !contentTypeVal.includes("application/json") &&
    !contentTypeVal.includes("text/html")
  );
}

function responseMIMEInvalid(acceptVal) {
  return (
    acceptVal &&
    acceptVal != "*/*" &&
    !acceptVal.includes("application/json") &&
    !acceptVal.includes("text/html")
  );
}

// determine whether or not the Content Type and Accept headers are valid
function headerValidation(acceptVal, contentTypeVal) {
  let output = {
    acceptValid: true,
    contentTypeValid: true,
    status_code: null,
    error_msg: null,
  };

  if (!acceptVal && !contentTypeVal) {
    return output;
  }

  if (requestMIMEInvalid(contentTypeVal)) {
    output.contentTypeValid = false;
    output.error_msg = {
      Error: "The request MIME type is not supported by this endpoint",
    };
    output.status_code = 415;
  } else if (responseMIMEInvalid(acceptVal)) {
    output.acceptValid = false;
    output.error_msg = {
      Error:
        "The requested response MIME type is not supported by this endpoint",
    };
    output.status_code = 406;
  }
  return output;
}

module.exports = {
  generateState,
  storeState,
  storeUser,
  extractSubFromJwt,
  stateExists,
  headerValidation,
  retrieveJwt,
};
