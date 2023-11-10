class User {
  constructor(userId, firstName, lastName, age, gender, weight, height, fitnessTrack) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.weight = weight;
    this.height = height;
    this.fitnessTrack = fitnessTrack;

  }

  // Method to convert the user object to JSON
  toJSON() {
    return {
      user_id: this.user_id,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      gender: this.gender,
      weight: this.weight,
      height: this.height,
      fitnessTrack: this.fitnessTrack,
    };
  }
}
