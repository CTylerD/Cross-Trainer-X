SET
    FOREIGN_KEY_CHECKS = 0;


    -- Create the State table if it doesn't exist, or replace an existing table with the same name
CREATE OR REPLACE TABLE State (
    state_id INT AUTO_INCREMENT PRIMARY KEY,  
    value VARCHAR(255) NOT NULL
);

-- Create the Users Entity and includes onset survey
CREATE OR REPLACE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    sub_id VARCHAR(255) NOT NULL UNIQUE,       
    avatar INT NOT NULL,                    
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    user_weight INT NOT NULL,
    height INT NOT NULL,
    fitness_goal VARCHAR(255) NOT NULL,          
    Fitness_level VARCHAR(255) NOT NULL     
);

INSERT INTO Users (sub_id, avatar, first_name, last_name, date_of_birth, user_weight, height, fitness_goal, Fitness_level)
VALUES
  ('auth0|111111', 1, 'John', 'Doe', '1990-05-15', 70, 175, 'lose weight', 'beginner'),
  ('auth0|222222', 2, 'Alice', 'Smith', '1985-08-20', 60, 160, 'build strength/muscle mass', 'intermediate'),
  ('auth0|333333', 3, 'Emma', 'Johnson', '1992-03-10', 65, 170, 'flexibility', 'advanced'),
  ('auth0|444444', 4, 'Michael', 'Brown', '1988-12-01', 75, 180, 'build strength/muscle mass', 'intermediate'),
  ('auth0|555555', 5, 'Sophia', 'Wilson', '1982-06-25', 55, 155, 'lose weight', 'beginner'),
  ('auth0|666666', 1, 'Liam', 'Martinez', '1995-09-05', 80, 185, 'lose weight', 'beginner'),
  ('auth0|777777', 2, 'Olivia', 'Garcia', '1989-04-30', 70, 175, 'flexibility', 'advanced'),
  ('auth0|888888', 3, 'Noah', 'Rodriguez', '1991-07-12', 73, 178, 'build strength/muscle mass', 'intermediate'),
  ('auth0|999999', 4, 'Ava', 'Hernandez', '1987-10-28', 68, 172, 'lose weight', 'beginner'),
  ('auth0|101010', 5, 'James', 'Davis', '1994-02-18', 82, 188, 'flexibility', 'advanced'),
  ('auth0|123456', 1, 'Sophie', 'Clark', '1986-11-08', 63, 163, 'build strength/muscle mass', 'intermediate'),
  ('auth0|121212', 2, 'Mia', 'Brown', '1993-06-15', 78, 183, 'lose weight', 'beginner'),
  ('auth0|131313', 3, 'Ethan', 'Thomas', '1990-09-21', 76, 181, 'build strength/muscle mass', 'intermediate'),
  ('auth0|141414', 4, 'Isabella', 'Wilson', '1984-03-04', 62, 157, 'lose weight', 'beginner'),
  ('auth0|151515', 5, 'Lucas', 'Lee', '1983-02-09', 79, 187, 'flexibility', 'advanced'),
  ('auth0|161616', 1, 'Aiden', 'Anderson', '1996-04-17', 72, 176, 'flexibility', 'advanced'),
  ('auth0|171717', 2, 'Sophia', 'Garcia', '1988-11-22', 67, 171, 'build strength/muscle mass', 'intermediate'),
  ('auth0|181818', 3, 'Oliver', 'Martinez', '1994-07-07', 74, 179, 'lose weight', 'beginner'),
  ('auth0|191919', 4, 'Lily', 'Roberts', '1986-08-14', 69, 173, 'build strength/muscle mass', 'intermediate'),
  ('auth0|202020', 5, 'Henry', 'Perez', '1992-02-27', 77, 182, 'flexibility', 'advanced');




-- Create the Exercises Entity table that contains all the exercises
CREATE OR REPLACE TABLE Exercises (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,        
    description TEXT NOT NULL,
    muscle_group VARCHAR(255) NOT NULL,
    equipment VARCHAR(255) NOT NULL,
    user_id INT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
INSERT INTO Exercises (exercise_name, type, description, muscle_group, equipment)
VALUES
  ('Push-ups', 'Strength', 'Push your body up and down.', 'Chest', 'None'),
  ('Squats', 'Strength', 'Bend your knees and stand back up.', 'Legs', 'None'),
  ('Yoga', 'Flexibility', 'Various yoga poses and stretches.', 'Whole body', 'Yoga mat'),
  ('Running', 'Cardio', 'Jogging or running at a moderate pace.', 'Whole body', 'Running shoes'),
  ('Plank', 'Core', 'Hold a plank position for a certain time.', 'Core', 'None'),
  ('Cycling', 'Cardio', 'Riding a stationary or outdoor bike.', 'Legs', 'Bicycle'),
  ('Dumbbell Curls', 'Strength', 'Lift dumbbells for bicep curls.', 'Arms', 'Dumbbells'),
  ('Jumping Jacks', 'Cardio', 'Jumping with arms and legs spread wide.', 'Whole body', 'None'),
  ('Swimming', 'Cardio', 'Swimming in a pool or open water.', 'Whole body', 'Swimsuit'),
  ('Crunches', 'Core', 'Abdominal crunches for core strength.', 'Core', 'None'),
  ('Deadlifts', 'Strength', 'Lifting heavy weights from the ground.', 'Back', 'Barbell'),
  ('Pilates', 'Flexibility', 'Pilates exercises for core strength and flexibility.', 'Whole body', 'Pilates mat'),
  ('Pull-ups', 'Strength', 'Pull your body up to a bar.', 'Back', 'Pull-up bar'),
  ('Rowing', 'Cardio', 'Rowing machine or water rowing.', 'Whole body', 'Rowing machine'),
  ('Leg Press', 'Strength', 'Pressing weights with your legs.', 'Legs', 'Leg press machine'),
  ('Hiking', 'Cardio', 'Hiking in the great outdoors.', 'Whole body', 'Hiking boots'),
  ('Boxing', 'Cardio', 'Boxing training and exercises.', 'Whole body', 'Boxing gloves'),
  ('Bicycle Crunches', 'Core', 'Crunches with a bicycle motion.', 'Core', 'None'),
  ('Bench Press', 'Strength', 'Bench pressing weights.', 'Chest', 'Bench press'),
  ('Tai Chi', 'Flexibility', 'Gentle and flowing martial art exercises.', 'Whole body', 'None');



-- 9 pre-established fitnessPlans. can be duplicated and assigned to a new user.
CREATE OR REPLACE TABLE FitnessPlans (
    fitness_id INT AUTO_INCREMENT PRIMARY KEY,
    plan_number INT NOT NULL,
    exercise_id INT NOT NULL,
    user_id INT,
    FOREIGN KEY (exercise_id) REFERENCES Exercises(exercise_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
INSERT INTO FitnessPlans (plan_number, exercise_id, user_id) VALUES
(1, 5, NULL), (1, 14, NULL), (1, 8, NULL), (1, 10, NULL), (1, 2, NULL), (1, 18, NULL), (1, 16, NULL), (1, 3, NULL), (1, 19, NULL), (1, 12, NULL), (1, 7, NULL), (1, 6, NULL),
(2, 13, NULL), (2, 8, NULL), (2, 4, NULL), (2, 15, NULL), (2, 1, NULL), (2, 11, NULL), (2, 20, NULL), (2, 6, NULL), (2, 9, NULL), (2, 2, NULL), (2, 12, NULL), (2, 7, NULL),
(3, 18, NULL), (3, 5, NULL), (3, 10, NULL), (3, 15, NULL), (3, 3, NULL), (3, 9, NULL), (3, 17, NULL), (3, 1, NULL), (3, 20, NULL), (3, 4, NULL), (3, 11, NULL), (3, 8, NULL),
(4, 2, NULL), (4, 13, NULL), (4, 16, NULL), (4, 6, NULL), (4, 4, NULL), (4, 20, NULL), (4, 15, NULL), (4, 12, NULL), (4, 7, NULL), (4, 9, NULL), (4, 14, NULL), (4, 1, NULL),
(5, 7, NULL), (5, 14, NULL), (5, 12, NULL), (5, 15, NULL), (5, 5, NULL), (5, 3, NULL), (5, 2, NULL), (5, 9, NULL), (5, 11, NULL), (5, 20, NULL), (5, 16, NULL), (5, 6, NULL),
(6, 16, NULL), (6, 7, NULL), (6, 10, NULL), (6, 4, NULL), (6, 1, NULL), (6, 11, NULL), (6, 19, NULL), (6, 3, NULL), (6, 18, NULL), (6, 15, NULL), (6, 8, NULL), (6, 5, NULL),
(7, 13, NULL), (7, 20, NULL), (7, 11, NULL), (7, 9, NULL), (7, 2, NULL), (7, 6, NULL), (7, 8, NULL), (7, 18, NULL), (7, 17, NULL), (7, 3, NULL), (7, 14, NULL), (7, 1, NULL),
(8, 16, NULL), (8, 5, NULL), (8, 2, NULL), (8, 10, NULL), (8, 13, NULL), (8, 19, NULL), (8, 4, NULL), (8, 12, NULL), (8, 15, NULL), (8, 7, NULL), (8, 11, NULL), (8, 6, NULL),
(9, 8, NULL), (9, 1, NULL), (9, 3, NULL), (9, 9, NULL), (9, 16, NULL), (9, 13, NULL), (9, 7, NULL), (9, 5, NULL), (9, 11, NULL), (9, 12, NULL), (9, 20, NULL), (9, 10, NULL);



SET
    FOREIGN_KEY_CHECKS = 1;


-- -- workout plans that have the exercises from the user's fitness plan
-- CREATE OR REPLACE TABLE Workout (
--     workout_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     exercise_id INT NOT NULL,
--     FOREIGN KEY (exercise_id) REFERENCES FitnessPlans(fitness_id)
-- );





-- CREATE OR REPLACE TABLE DailyWorkout (
--     daily_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     workout_id INT NOT NULL FOREIGN KEY,
--     exercise_id INT NOT NULL FOREIGN KEY,
--     position INT NOT NULL 
--     weight int NULL,
--     time INT NULL,
-- );

-- -- Create the ExerciseRatings table if it doesn't exist, or replace an existing table with the same name
-- CREATE OR REPLACE TABLE ExerciseRatings (
--     rating_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     weight INT NULL,
--     reps INT NULL,
--     difficulty INT NOT NULL,     -- 1-3, 1=easy 2=medium 3=hard
--     exercise_id INT NOT NULL
-- );