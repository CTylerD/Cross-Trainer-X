var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "capstone_2023_personaltrainer",
  password: "m-Z.8!9XrTVK57)W",
  database: "cs340_dennchar",
});

module.exports.pool = pool;
