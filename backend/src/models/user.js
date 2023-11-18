class User {
  constructor(
    userId,
    email,
    avatarId,
    firstName,
    lastName,
    city,
    state,
    age,
    gender,
    weight,
    height,
    fitnessTrack,
    secondaryTrack
  ) {
    this.userId = userId;
    this.email = email;
    this.avatarId = avatarId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.state = state;
    this.age = age;
    this.gender = gender;
    this.weight = weight;
    this.height = height;
    this.fitnessTrack = fitnessTrack;
    this.secondaryTrack = secondaryTrack;
  }

  // Method to convert the user object to JSON
  toJSON() {
    return {
      user_id: this.user_id,
      email: this.email,
      avatarId: this.avatarId,
      firstName: this.firstName,
      lastName: this.lastName,
      city: this.city,
      state: this.state,
      age: this.age,
      gender: this.gender,
      weight: this.weight,
      height: this.height,
      fitnessTrack: this.fitnessTrack,
      secondaryTrack: this.secondaryTrack,
    };
  }
}

module.exports = User;
