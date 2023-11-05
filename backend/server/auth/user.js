async function addUser() {
  try {
    console.log("adding user to database");
    return {user : "user|id"};
  } catch (error) {
    console.error(error);
  }
}

module.exports = { addUser };