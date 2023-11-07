class Exercise {
  constructor(
    id,
    name,
    type,
    description,
    muscle_group,
    user_id,
    equipment,
    rating
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.muscle_group = muscle_group;
    this.user_id = user_id;
    this.equipment = equipment;
    this.rating = rating;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      description: this.description,
      muscle_group: this.muscle_group,
      user_id: this.user_id,
      equipment: this.equipment,
      rating: this.rating
    };
  }
}
