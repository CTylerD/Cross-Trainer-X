async function addUser() {
  try {
    return {user : "user|id"};
  } catch (error) {
    console.error(error);
  }
}

module.exports = { addUser };