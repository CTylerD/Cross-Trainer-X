SET
    FOREIGN_KEY_CHECKS = 0;


    -- Create the State table if it doesn't exist, or replace an existing table with the same name
CREATE OR REPLACE TABLE State (
    state_id VARCHAR(255) NOT NULL PRIMARY KEY,       --"sub" from id token
    user_data JSON NOT NULL
);


-- Create the Users table if it doesn't exist, or replace an existing table with the same name
CREATE OR REPLACE TABLE Users (
    user_id INT NOT NULL PRIMARY KEY,       --"sub" from id token
    user_data JSON NOT NULL -- user’s profile data
);

-- Insert data into the Users table
INSERT INTO Users (user_data) VALUES
('{"firstname": "Alice", "lastname": "Smith", "age": 28, "gender": "Female", "weight": "140 pounds", "height": "5 ft 6 in"}'),
('{"firstname": "Bob", "lastname": "Johnson", "age": 35, "gender": "Male", "weight": "200 pounds", "height": "6 ft 2 in"}'),
('{"firstname": "Eva", "lastname": "Brown", "age": 24, "gender": "Female", "weight": "125 pounds", "height": "5 ft 4 in"}'),
('{"firstname": "David", "lastname": "Wilson", "age": 29, "gender": "Male", "weight": "185 pounds", "height": "6 ft"}'),
('{"firstname": "Grace", "lastname": "Miller", "age": 31, "gender": "Female", "weight": "150 pounds", "height": "5 ft 8 in"}');


-- Create the FitnessPlans table if it doesn't exist, or replace an existing table with the same name
CREATE OR REPLACE TABLE FitnessPlans (
    fitness_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    workouts JSON NOT NULL, -- all the workouts in the fitness plan
    current_workout INT NOT NULL, -- current workout user is on
    user_id INT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert data into the FitnessPlans table
INSERT INTO FitnessPlans (workouts, current_workout, user_id) VALUES
('{"workout4", "workout5", "workout6"}', 2, 2),
('{"workout1", "workout2", "workout3"}', 3, 3),
('{"workout2", "workout3", "workout4"}', 1, 4),
('{"workout3", "workout4", "workout5"}', 1, 5),
('{"workout5", "workout6", "workout1"}', 2, 1);


-- Create the Workout table if it doesn't exist, or replace an existing table with the same name
CREATE OR REPLACE TABLE Workout (
    workout_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    exercises JSON NOT NULL
);

-- Insert data into the Workout table
INSERT INTO Workout (exercises) VALUES
('{"exercise4", "exercise5", "exercise6"}'),
('{"exercise1", "exercise2", "exercise3"}'),
('{"exercise2", "exercise3", "exercise4"}'),
('{"exercise3", "exercise4", "exercise5"}'),
('{"exercise5", "exercise6", "exercise1"}');


-- Create the ExerciseRatings table if it doesn't exist, or replace an existing table with the same name
CREATE OR REPLACE TABLE ExerciseRatings (
    rating_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    weight INT NULL,
    reps INT NULL,
    difficulty INT NOT NULL     -- 1-3, 1=easy 2=medium 3=hard
);

-- Insert data into the ExerciseRatings table
INSERT INTO ExerciseRatings (weight, reps, difficulty) VALUES
(60, 12, 3),
(45, 8, 1),
(70, 10, 2),
(55, 12, 3),
(40, 8, 1);



-- Create the Exercises table if it doesn't exist, or replace an existing table with the same name
CREATE OR REPLACE TABLE Exercises (
    exercise_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    muscle_group VARCHAR(255) NOT NULL,
    equipment VARCHAR(255) NOT NULL,
    user_id INT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    rating_id INT NULL,
    FOREIGN KEY (rating_id) REFERENCES ExerciseRatings(rating_id)
);

-- Insert data into the Exercises table
INSERT INTO Exercises (name, type, description, muscle_group, equipment, user_id, rating_id) VALUES
('Deadlift', 'Strength', 'Back and legs workout', 'Back', 'Barbell', 2, 2),
('Squat', 'Strength', 'Leg workout', 'Legs', 'Barbell', 3, 3),
('Pull-up', 'Strength', 'Back and biceps workout', 'Back', 'Pull-up bar', 4, 4),
('Push-up', 'Bodyweight', 'Chest and triceps workout', 'Chest', 'None', 5, 5),
('Plank', 'Core', 'Core workout', 'Core', 'None', 1, 1);



SET
    FOREIGN_KEY_CHECKS = 1;
