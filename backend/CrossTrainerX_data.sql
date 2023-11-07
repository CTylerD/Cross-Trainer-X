-- selects the entire USER TABLE
select * From Users;


--select and group by the plan_number in BasicPlans table shows plan_number & exercise_id
SELECT plan_number, GROUP_CONCAT(exercise_id) AS exercises
FROM BasicPlans
GROUP BY plan_number;


--select and group by the plan_number in BasicPlans table shows plan_number & exercise_name
SELECT bp.plan_number, GROUP_CONCAT(e.exercise_name) AS exercises
FROM BasicPlans bp
INNER JOIN Exercises e ON bp.exercise_id = e.exercise_id
GROUP BY bp.plan_number
ORDER BY bp.plan_number;


-- adds and assigns one of the preset fitness plans for the user.
INSERT INTO FitnessPlans (plan_number, exercise_id, user_id)
SELECT plan_number, exercise_id, 3
FROM FitnessPlans
WHERE plan_number = 6;

















































-- SET
--     FOREIGN_KEY_CHECKS = 0;


--     -- Create the State table if it doesn't exist, or replace an existing table with the same name
-- CREATE OR REPLACE TABLE State (
--     state_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  
--     value VARCHAR(255) NOT NULL
-- );


-- -- Create the Users table if it doesn't exist, or replace an existing table with the same name
-- CREATE OR REPLACE TABLE Users (
--     user_id INT NOT NULL PRIMARY KEY,      --"sub" from id token
--     avatar INT NOT NULL,                    -- avatar will be selected from 5 preset characters
--     first_name VARCHAR(255) NOT NULL,
--     last_name VARCHAR(255) NOT NULL,
--     date_of_birth DATE NOT NULL,
--     weight INT NOT NULL,
--     height INT NOT NULL,
--     fitness_goal VARCHAR NOT NULL,          --lose weight, build strength/muscle mass, flexibility
--     Fitness_level VARCHAR(255) NOT NULL     --beginner, intermediate, advanced
-- );


-- -- Create the Exercises table if it doesn't exist, or replace an existing table with the same name
-- CREATE OR REPLACE TABLE Exercises (
--     exercise_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     type VARCHAR(255) NOT NULL,             --
--     description TEXT NOT NULL,
--     reps INT NULL,
--     weight int NULL,
--     time INT NULL,
--     user_id INT NULL FK,
--     muscle_group VARCHAR(255) NOT NULL,
--     equipment VARCHAR(255) NOT NULL,
--     completed Boolean NOT NULL                  --once user has completed specific "type" workout, it will be completed
-- );


-- -- 9 established basic plans.
-- CREATE OR REPLACE TABLE FitnessPlans (
--     fitness_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     user_id INT NOT NULL FOREIGN KEY,
--     exercise_id INT NOT NULL FOREIGN KEY
-- );

-- -- intersection between exercises and workouts, daily workout table
-- Fitness Plan Workouts
-- (all integers)
-- id - id of workout/exercise
-- workout_id - id of workout
-- exercise_id INT NOT NULL FK,
-- position INT NOT NULL 


-- -- Create the Workout table if it doesn't exist, or replace an existing table with the same name
-- CREATE OR REPLACE TABLE Workout (
--     workout_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
--     user_id INT NOT NULL FK
--     completed
--     position
-- );


-- -- Create the ExerciseRatings table if it doesn't exist, or replace an existing table with the same name
-- CREATE OR REPLACE TABLE ExerciseRatings (
--     rating_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     weight INT NULL,
--     reps INT NULL,
--     difficulty INT NOT NULL,     -- 1-3, 1=easy 2=medium 3=hard
--     exercise_id INT NOT NULL
-- );


-- SET
--     FOREIGN_KEY_CHECKS = 1;
