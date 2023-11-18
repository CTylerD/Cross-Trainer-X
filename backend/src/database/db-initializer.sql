-- ## CONSTRUCTION ORDER ##
-- Avatars         -- 6 records
-- Users           -- 7 records
-- Exercises       -- 35 / 2 / 39 / 38 records
-- UserExercises   -- 38 records
-- Workouts
-- Surveys

DROP TABLE IF EXISTS Surveys;
DROP TABLE IF EXISTS Workouts;
DROP TABLE IF EXISTS UserExercises;
DROP TABLE IF EXISTS Exercises;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Avatars;       

CREATE TABLE Avatars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  file_path VARCHAR(255) NOT NULL,
  UNIQUE KEY(file_path)
);

INSERT INTO Avatars (file_path) VALUES
('file_path_1'),
('file_path_2'),
('file_path_3'),
('file_path_4'),
('file_path_5'),
('file_path_6');

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    avatar_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    state VARCHAR(255),
    age INT,
    gender VARCHAR(255),
    weight INT,
    height INT,
    fitness_track ENUM('Strength', 'Cardio', 'Flexibility') NOT NULL,
    secondary_track ENUM('Running', 'Cycling', 'Yoga', 'Stretching')
);

INSERT INTO Users (user_id, email, avatar_id, first_name, last_name, city, state, age, gender, weight, height, fitness_track, secondary_track)
VALUES
('65512a3b7409f13021857720', 'user1@mock.com', 1, 'firstName1', 'lastName1', 'City1', 'State1', 25, 'Male', 160, 70, 'Strength', NULL),
('65512a7064e79113efca213b', 'user2@mock.com', 2, 'firstName2', 'lastName2', 'City2', 'State2', 30, 'Female', 140, 65, 'Strength', NULL),
('65512aa4f51452e44ecddaae', 'user3@mock.com', 3, 'firstName3', 'lastName3', 'City3', 'State3', 28, 'Agender', 150, 68, 'Strength', NULL),
('65512ad4f51452e44ecddac4', 'user4@mock.com', 4, 'firstName4', 'lastName4', 'City4', 'State4', 32, 'Non-Binary', 120, 63, 'Cardio', 'Running'),
('65512b098eaf8db1930f6e56', 'user5@mock.com', 5, 'firstName5', 'lastName5', 'City5', 'State5', 27, 'Pangender', 170, 75, 'Cardio', 'Cycling'),
('655133dd3e05dd89a157815a', 'user6@mock.com', 6, 'firstName6', 'lastName6', 'City6', 'State6', 29, 'Transmasculine', 145, 68, 'Flexibility', 'Yoga'),
('655133f67409f13021857cfb', 'user7@mock.com', 7, 'firstName7', 'lastName7', 'City7', 'State7', 31, 'Transfeminine', 160, 72, 'Flexibility', 'Stretching');


CREATE TABLE Exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    type ENUM('Strength', 'Cardio', 'Flexibility') NOT NULL,
    secondary_type ENUM('Running', 'Cycling', 'Yoga', 'Stretching'),
    description VARCHAR(255) NOT NULL,
    muscle_group ENUM('Chest', 'Shoulders', 'Triceps', 'Back', 'Biceps', 'Deltoids', 'Calves', 'Glutes', 'Hamstrings', 'Quads'),
    equipment VARCHAR(255),
    weight_class ENUM('1', '2', '3')
);

-- Insert Strength Exercises
INSERT INTO Exercises (user_id, name, type, description, muscle_group, equipment, weight_class)
VALUES
(NULL, 'Bench press', 'Push', 'Lie with your back on a weight bench and then lower a barbell to your chest and press it back up', 'Chest', 'Bench, barbell', '3'),
(NULL, 'Overhead press', 'Push', 'Standing with the barbell at shoulder-height, press it up over your head', 'Shoulders', 'Barbell', '3'),
(NULL, 'Preacher curls', 'Pull', 'Grab the bar in front of you with your elbows resting on the bench and then perform a curl keeping your elbows in place', 'Biceps', 'Barbell, bench', '3'),
(NULL, 'Cable rows', 'Pull', 'Grab the cable with your arms stretched out in front of you, pull it back until your elbows are behind you and then release', 'Back', 'Cable machine', '3'),
(NULL, 'Inverted rows', 'Pull', 'Lie flat on your back with your arms fully outstretched and grabbing the bar, then lift your body up to the bar and lower down', 'Back', 'Barbell', '3'),
(NULL, 'Seated cable rows', 'Pull', 'Grab the cable with your arms stretched out in front of you, pull it back until your elbows are behind you and then release', 'Back', 'Cable machine', '3'),
(NULL, 'Squats', 'Legs', 'With a barbell across your shoulders, lower down into a squat and then press back up', 'Quads', 'Barbell', '3'),
(NULL, 'Leg press', 'Legs', 'Press your legs out and away from you and slowly lower back down.', 'Quads', 'Leg press machine', '3'),
(NULL, 'Standing calf raises', 'Legs', 'Use a calf raise machine to apply weight to your shoulders as you stand up on tiptoes to lift it up.', 'Calves', 'Calf raise machine', '3'),
(NULL, 'Glute bridges', 'Legs', 'Lying on a bench with your feet on the floor and a dumbbell across your hips, raise your hips up to lift the weight and slowly lower down.', 'Glutes', 'Barbell, Bench', '3'),
(NULL, 'Deadlifts', 'Legs', 'Bend over to grab a barbell on the floor and straighten your back and legs to lift it off the ground until you are standing.', 'Hamstrings', 'Barbell', '3'),
(NULL, 'Good mornings', 'Legs', 'With a barbell across your shoulders and your back leaned slightly over (but straight), stand up tall and then lower back down.', 'Hamstrings', 'Barbell', '3'),

(NULL, 'Dumbbell flys', 'Push', 'Lie with your back on a weight bench with your arms extended out to each side. Then, lift the dumbbells up over your head until they meet in the middle in front of you.', 'Chest', 'Dumbells, bench', '2'), -- id = 13
(NULL, 'Reverse flys', 'Push', 'Stand up, leaning forward, with a dumbbell in each hand and gradually raise the dumbbells out to the sides and lower them', 'Chest', 'Dumbbells', '2'),
(NULL, 'Tricep kickbacks', 'Push', 'Lean forward with a dumbbell in your hand and your arm bent, then slowly extend your arm backward until it is straight and repeat.', 'Triceps', 'Dumbbells, bench', '2'),
(NULL, 'Dumbbell pullover', 'Push', 'Lie with your back on a bench and grab a dumbbell behind your head with both hands, then slowly lift the dumbbell up and over your head and lower down', 'Triceps', 'Dumbbells, bench', '2'),
(NULL, 'Tricep pushdowns', 'Push', 'Grab the cable and pull it down until your arms are straight and gradually bend your arms to raise the cable', 'Triceps', 'Cable machine', '2'),
(NULL, 'Lateral raises', 'Push', 'Stand with your arms at your sides with a dumbbell in each hand, then raise your arms out to the sides, parallel with the floor', 'Shoulders', 'Dumbbells', '2'),
(NULL, 'Front raises', 'Push', 'Stand with your arms at your sides with a dumbbell in each hand, then raise your arms in front of you to be parallel with the floor', 'Shoulders', 'Dumbbells', '2'),
(NULL, 'Dumbbell rows', 'Pull', 'Lean over on a bench with one arm, holding a dumbbell in your other straightened arm, and slowly raise your arm up until your elbow is behind you and lower it back down', 'Biceps', 'Dumbbells', '2'),
(NULL, 'Face pulls', 'Pull', 'Hold the cable with your arms out in front of you and then pull the rope directly towards your face and then release', 'Deltoids', 'Cable machine', '2'),
(NULL, 'Rear deltoid raises', 'Pull', 'Lean over with a dumbbell in each hand and lift your arms out to each side', 'Deltoids', 'Dumbbells', '2'),
(NULL, 'Reverse flys', 'Pull', 'Lean forward, letting arms hang down with dumbbells, and slowly raise arms out to sides and lower down', 'Deltoids', 'Dumbbells', '2'),
(NULL, 'Bicep curls', 'Pull', 'Stand up straight with a dumbbell in each hand with your arms straightened to your sides and slowly lift each arm up to bring the weight to your shoulder without moving your arm above the elbow and lower down', 'Biceps', 'Dumbbells', '2'),
(NULL, 'Lat pulldowns', 'Pull', 'Grab the bar on the machine with your arms outstretched overhead, with palms facing away from you, and gradually lower the bar down to your chest and release', 'Back', 'Pulldown machine', '2'),
(NULL, 'Lunges', 'Legs', 'Standing with dumbbells by your sides, step forward into a lunge and then raise back up.', 'Quads', 'Dumbbells', '2'),
(NULL, 'Calf raises', 'Legs', 'Standing with dumbbells by your side, stand up on your tiptoes and then lower down.', 'Calves', 'Dumbbells', '2'),
(NULL, 'Step-ups', 'Legs', 'Standing with dumbbells at your sides, step up onto a step and then lower back down.', 'Glutes', 'Box, Dumbbells', '2'),
(NULL, 'Leg curls', 'Legs', 'In a leg curl machine, lift your legs up to lift the weights and then lower back down.', 'Hamstrings', 'Leg curl machine', '2'),
(NULL, 'Hamstring curls', 'Legs', 'In a hamstring curl machine, lift your legs up to lift the weights and then lower back down.', 'Hamstrings', 'Hamstring curl machine', '2'),

(NULL, 'Push-ups', 'Push', 'From the plank position, lower yourself to the floor and then push up', 'Chest', NULL, '1'), -- id = 31
(NULL, 'Chest dips', 'Push', 'Grip two dip bars while leaning forward with your arms straight, then lower down and raise up', 'Chest', 'Dip bars', '1'),
(NULL, 'Tricep dips', 'Push', 'Suspend yourself on dip bars with your arms straight, then lower down and press back up again', 'Triceps', 'Dip bars', '1'),
(NULL, 'Pull-ups', 'Pull', 'Suspended from a bar, use your arms to pull your chin up over the bar', 'Biceps', 'Pull-up bar', '1'),
(NULL, 'Box jumps', 'Legs', 'Stand in front of a box. Jump onto said box. Repeat.', 'Quads', 'Box', '1');

-- Insert Cardio Exercises
INSERT INTO Exercises (user_id, name, type, secondary_type, description)
VALUES
(NULL, 'Running', 'Cardio', 'Running', 'Run, Forrest, run!'), -- id = 36
(NULL, 'Cycling', 'Cardio', 'Cycling', 'I want to ride my bicycle, I want to ride my bike!');

-- Insert Yoga Exercises
INSERT INTO Exercises (user_id, name, type, secondary_type, description)
VALUES
(NULL, 'Moutain', 'Cardio', 'Yoga', 'Stand upright with your arms at your sides, palms facing forward'), -- id = 38
(NULL, 'Standing Forward Bend', 'Cardio', 'Yoga', 'With your legs straight, bend over and try to touch your toes'),
(NULL, 'Child''s Pose', 'Cardio', 'Yoga', 'Sit kneeling on the floor and bring your forehead to touch the ground with your arms outstretched overhead.'),
(NULL, 'Cat-Cow', 'Cardio', 'Yoga', 'On all fours, arch your back on the inhale, round your back on the exhale. Repeat.'),
(NULL, 'Downward Facing Dog', 'Cardio', 'Yoga', 'On all fours with your hands and feet 3-4 feet apart, extend your limbs and press into the floor to lift your body off the ground.'),
(NULL, 'Warrior I', 'Cardio', 'Yoga', 'Assume a lunge position, put your hands together, and lift them up over your head. Repeat on both sides.'),
(NULL, 'Warrior II', 'Cardio', 'Yoga', 'Assume a lunge position, stretch your hands out so that your arms are straight over their respective legs. Repeat on both sides.'),
(NULL, 'Triangle', 'Cardio', 'Yoga', 'Place one foot 3-4 feet in front of the other, reach down and grab your front foot with the same arm and stretch the other arm up overhead. Repeat on both sides.'),
(NULL, 'Seated Forward Bend', 'Cardio', 'Yoga', 'Sit with your legs extended in front of you and reach out towards your toes.'),
(NULL, 'Bridge', 'Cardio', 'Yoga', 'Lie on your back with your knees bend. Gradually straighten your back and use your legs to lift your body up off the ground.'),
(NULL, 'Cobra', 'Cardio', 'Yoga', 'Lie on your stomach, place your hands on the ground next to your shoulders and then straighten your arms to lift your body off the ground and look upwards.'),
(NULL, 'Seated Twist', 'Cardio', 'Yoga', 'With one leg straight and one leg bent, place your opposite elbow on the outside of your bent knee and twist your body across for a spinal stretch.'),
(NULL, 'Happy Baby', 'Cardio', 'Yoga', 'Lying on your back, grab your feet and then point the soles of your feet up overhead to be parallel with the floor'),
(NULL, 'Corpse', 'Cardio', 'Yoga', 'Lie flat on your back with arms and legs outstretched'),
(NULL, 'Low Lunge Twist', 'Cardio', 'Yoga', 'Take a lunge forward and turn your body sideways to open up towards your back foot. Repeat on both sides.'),

(NULL, 'Boat', 'Cardio', 'Yoga', 'Sit with your legs straight and raise your legs at a 45-degree angle and stretch your arms out towards your feet'), -- id = 53
(NULL, 'Plank', 'Cardio', 'Yoga', 'Hold the top of a pushup position'),
(NULL, 'Pigeon', 'Cardio', 'Yoga', 'Place one foot in front of you at a 90-degree angle with the other leg outstretched behind you. Lower down into your front leg until you feel a stretch.'),
(NULL, 'Camel', 'Cardio', 'Yoga', 'Kneeling, form a 90-degree angle with your knees so that you''re sitting up tall and then reach back and grab your feet with your hands'),
(NULL, 'Tree', 'Cardio', 'Yoga', 'Stand on one leg, bend the opposite leg so your foot is pressed into the side of the thigh of your standing leg and place your palms together at your heart.'),
(NULL, 'Half Moon', 'Cardio', 'Yoga', 'Stand with your arms stretched out straight, parallel to the floor, and then bend over to stand on one leg and straighten the other leg out behind you to be parallel to the floor as you bend over and place one arm on the ground. Repeat on the other side.'),
(NULL, 'Shoulder Stand', 'Cardio', 'Yoga', 'Lying flat on your back, place your arms on the ground and your palms on your lower back to lift your legs up until they''re stretched out straight overhead.'),
(NULL, 'Fish', 'Cardio', 'Yoga', 'Lying flat on your back, sit on your hands and arch your back, keeping your head on the floor.'),
(NULL, 'Fallen Triangle', 'Cardio', 'Yoga', 'Standing with straight legs 3-4 feet apart, lean forward to place one arm straight on the ground and twist to rotate the other arm straight up overhead. Repeat on both sides.'),
(NULL, 'Chair', 'Cardio', 'Yoga', 'Stand with both legs bent generously, place palms together, and straight arms overhead as you look up'),
(NULL, 'Garland', 'Cardio', 'Yoga', 'Squat with both feet flat on the ground, place palms together at heart and use elbows to push knees outward'),
(NULL, 'Eagle', 'Cardio', 'Yoga', 'Standing with knees bent, wrap one leg around the opposite calf and bend arms in front of you with palms touching.'),
(NULL, 'Side Plank', 'Cardio', 'Yoga', 'From a plank, lift one hand off the ground and rotate your body upwards so your hand extends overhead, balancing on your other arm. Repeat on the other side.'),

(NULL, 'Firefly', 'Cardio', 'Yoga', 'Squat with arms straight and palms flat on the floor, then lift your legs up and point them straight forward, resting them on your upper arms.'), -- id = 66
(NULL, 'Scorpion', 'Cardio', 'Yoga', 'With all of your body weight pressed into your forearms on the ground, lift your legs together and reach them up overhead, resting on your head.'),
(NULL, 'Handstand', 'Cardio', 'Yoga', 'Press your palms into the ground and lift your legs straight up overhead to stand on your hands'),
(NULL, 'Peacock', 'Cardio', 'Yoga', 'Place your palms on the ground with your fingers pointing backwards, then straighten your legs behind you and lift your legs and body up off the ground'),
(NULL, 'Wheel', 'Cardio', 'Yoga', 'From a bridge pose, place your hands on the ground above your shoulders (fingers pointing towards your toes) and then raise up into a standing backbend.'),
(NULL, 'Hummingbird', 'Cardio', 'Yoga', 'Pressing both hands into the ground, extend one leg out straight to the opposite side and bend the other leg so that it rests on the straightened leg''s inner thigh.'),
(NULL, 'King Pigeon', 'Cardio', 'Yoga', 'Sit with one leg crossed in front of you as though you were sitting cross-legged and extend the other leg behind you with the foot pointing straight up and reach behind your head and grab your outstretched foot. Repeat on other side.'),
(NULL, 'Formidable Face', 'Cardio', 'Yoga', 'From a squat, place both hands on the ground in front of you facing forwards and then slowly lift your legs up until they are extended straight overhead while you keep your chin on the ground.'),
(NULL, 'Elephant Trunk', 'Cardio', 'Yoga', 'Place both palms on the ground with your legs straightened in front of you. Then loop one leg over your shoulder with the other leg straight and lift off the ground. Repeat on both sides.'),
(NULL, 'Compass', 'Cardio', 'Yoga', 'Bend one leg in front of you like you''re sitting cross-legged and then lift the other leg straight up in the air and reach the opposite hand over your head to grab your extended foot. Repeat on the other side.'),
(NULL, 'Crow', 'Cardio', 'Yoga', 'From a squat, place both hands on the floor and then place your knees in your elbow creases and lean forwards so all of your body weight is supported by your hands.');

-- Insert Stretching Exercises
INSERT INTO Exercises (user_id, name, type, secondary_type, description)
VALUES
(NULL, 'Neck Side Stretch', 'Cardio', 'Stretching', 'Place your left hand on the right side of your head and gently pull down towards your left shoulder. Repeat on the other side.'), -- id = 77
(NULL, 'Neck Rolls', 'Cardio', 'Stretching', 'Draw big circles with your nose in both directions.'),
(NULL, 'Shoulder Rolls', 'Cardio', 'Stretching', 'Draw big circles with your shoulders in both directions.'),
(NULL, 'Wrist Circles', 'Cardio', 'Stretching', 'Draw big circles with your wrists in both directions.'),
(NULL, 'Cat-Cow', 'Cardio', 'Stretching', 'On all fours, arch your back on the inhale, round your back on the exhale. Repeat.'),
(NULL, 'Seated Forward Bend', 'Cardio', 'Stretching', 'Sit with your legs out in front of you and reach as far forward as possible.'),
(NULL, 'Standing Forward Bend', 'Cardio', 'Stretching', 'Standing with feet shoulder-width apart, reach down towards the floor as far as you can'),
(NULL, 'Standing Quad Stretch', 'Cardio', 'Stretching', 'Standing on one leg, grab the other foot behind you with the opposite hand and gently pull back. Repeat on the other side.'),
(NULL, 'Standing Calf Stretch', 'Cardio', 'Stretching', 'Using a wall or some flat object in front of you, elevate one toe on this object and then lean forward until you feel a calf stretch. Repeat on the other side.'),
(NULL, 'Ankle Rolls', 'Cardio', 'Stretching', 'Draw big circles with your ankles in both directions.'),
(NULL, 'Seated Side Stretch', 'Cardio', 'Stretching', 'Sitting cross-legged on the floor, place one hand at your side and stretch the other arm up and over your head, using your floor hand to balance. Repeat on the other side.'),
(NULL, 'Triceps Stretch', 'Cardio', 'Stretching', 'Straighten one arm over your head, bend the elbow until your hand is behind your head and gently pull back on your elbow with the opposite hand. Repeat on both sides.'),
(NULL, 'Cross-body Shoulder Stretch', 'Cardio', 'Stretching', 'Stretch one arm all the way across your chest and gently pull with the opposite hand. Repeat on both sides.'),
(NULL, 'Hamstring Stretch', 'Cardio', 'Stretching', 'Sitting on the floor, bend one leg so that your foot is against the inside of the opposite thigh and stretch the other out in front of you. Stretch towards your outstretched leg with both hands. Repeat on the other side.'),

(NULL, 'Thread the Needle', 'Cardio', 'Stretching', 'On all fours, reach one arm underneath your body, threading it under your other arm until you feel a stretch. Repeat on both sides.'), -- id = 91
(NULL, 'Wrist Flexor Stretch', 'Cardio', 'Stretching', 'Hold one arm out in front of you, palm facing out - gently pull back on the palm with the other hand. Repeat on both sides.'),
(NULL, 'Figure Four Stretch', 'Cardio', 'Stretching', 'Lie on your back with legs bent. Cross one ankle over the opposite knee. Reach around the calf of your leg that''s on the floor and pull it up towards you, stretching the crossed leg. Repeat on other side.'),
(NULL, 'Lunge with Spinal Twist', 'Cardio', 'Stretching', 'Take a lunge forward and turn your body sideways to open up towards your back foot. Repeat on both sides.'),
(NULL, 'Seated Straddle Stretch', 'Cardio', 'Stretching', 'Sit with both legs straight out to the sides. Stretch forward, reaching as far as you can.'),
(NULL, 'Seated Forward Bend with Twist', 'Cardio', 'Stretching', 'Sit with both legs outstretched. Reach out towards your feet with one arm and reach straight up in the air with your other arm, opening up your body. Repeat on other side.'),
(NULL, 'Squatting Spinal Rotations', 'Cardio', 'Stretching', 'From a deep squat, reach one arm up and overhead to perform a back stretch. Repeat on other side.'),
(NULL, 'Butterfly Stretch', 'Cardio', 'Stretching', 'Sit with the soles of your feet touching, then press your knees down towards the floor and gently stretch your head down to your feet.'),
(NULL, 'Cobra Stretch', 'Cardio', 'Stretching', 'Lying on your stomach with legs outstretched, place your hands shoulder-width apart and push your head and torso to look upwards, stretching the back.'),
(NULL, 'Cat Stretch', 'Cardio', 'Stretching', 'On your knees, stretch your body out with your arms straight out in front of you and try to press your chest down towards the floor.'),
(NULL, 'One-Armed Side Stretch', 'Cardio', 'Stretching', 'Stand with your feet slightly wider than your shoulders, place one hand on your hip, and stretch the other arm up and over to the side. Repeat on other side.'),
(NULL, 'Full Toes Stretch', 'Cardio', 'Stretching', 'Kneel down with your toes curled under and then press your body weight back into your toes to stretch out the arches of your feet.'),

(NULL, 'Standing Pike Squats', 'Cardio', 'Stretching', 'From a squat position, put your hands flat on the floor and press up until your legs are straight, keeping your hands on the floor.'), -- id = 103
(NULL, 'Supine Spinal Twist', 'Cardio', 'Stretching', 'Lying on your back, cross one leg over your body and put it on the ground at a 90-degree angle. Then stretch your arms out perpendicular to your body and rotate your head to look in the other direction. Repeat on other side.'),
(NULL, 'Hip Flexor Lunges', 'Cardio', 'Stretching', 'Take a lunge, with the top of your back foot on the floor, and press down as low as you can, feeling the stretch in your rear hip flexor. Repeat on other side.'),
(NULL, 'Pigeon Stretch', 'Cardio', 'Stretching', 'Place one foot in front of you at a 90-degree angle with the other leg outstretched behind you. Lower down into your front leg until you feel a stretch.'),
(NULL, 'Standing Backbend', 'Cardio', 'Stretching', 'From a bridge pose, place your hands on the ground above your shoulders (fingers pointing towards your toes) and then raise up into a standing backbend.'),
(NULL, 'Extended Side Plank', 'Cardio', 'Stretching', 'From a plank, lift one hand off the ground and rotate your body upwards so your hand extends overhead, balancing on your other arm. Repeat on other side.'),
(NULL, 'Front Plank', 'Cardio', 'Stretching', 'Assume a push-up position and hold.'),
(NULL, 'Seated Quad Stretch', 'Cardio', 'Stretching', 'On all fours, reach one hand around to grab your opposite toes and pull your leg up until you feel a stretch across your quads.'),
(NULL, 'Chest Opener', 'Cardio', 'Stretching', 'From a standing position, clasp your hands behind your back and lean forward as you raise your hands up behind you until you feel a chest stretch.'),
(NULL, 'Two-Armed Side Stretch', 'Cardio', 'Stretching', 'Stand with your feet slightly wider than your shoulders, clasp your hands overhead, and move your arms to one side for a side stretch. Repeat on the other side.'),
(NULL, 'Palms Up Wrist Stretch', 'Cardio', 'Stretching', 'Kneeling with your thighs perpendicular to the ground, place your hands in front of your knees with your palms up and pointing towards your knees. Then, lean back to sit on your feet behind you.'),
(NULL, 'Palms Down Wrist Stretch', 'Cardio', 'Stretching', 'Kneeling with your thighs perpendicular to the ground, place your hands in front of your knees with your palms down and pointing towards your knees. Then, lean back to sit on your feet behind you.'); -- id = 114


CREATE TABLE UserExercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    reps INT,
    sets INT,
    weight INT,
    rest INT,
    duration INT,
    distance FLOAT,
    difficulty INT,
    times_completed INT DEFAULT 0,
    FOREIGN KEY (exercise_id) REFERENCES Exercises(id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert Strength Exercises
INSERT INTO UserExercises (exercise_id, user_id, reps, sets, weight, rest, times_completed)
VALUES
-- User 1: Strength (beginner)
(1,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Bench press
(2,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Overhead press
(3,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Preacher curls
(4,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Cable rows
(5,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Inverted rows
(6,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Seated cable rows
(7,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Squats
(8,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Leg press
(9,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Standing calf raises
(10, "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Glute bridges
(11, "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Deadlifts
(12, "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Good mornings
(13, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Dumbbell flys
(14, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Reverse flys
(15, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Tricep kickbacks
(16, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Dumbbell pullover
(17, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Tricep pushdowns
(18, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Lateral raises
(19, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Front raises
(20, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Dumbbell rows
(21, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Face pulls
(22, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Rear deltoid raises
(23, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Reverse flys
(24, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Bicep curls
(25, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Lat pulldowns
(26, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Lunges
(27, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Calf raises
(28, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Step-ups
(29, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Leg curls
(30, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Hamstring curls
(31, "65512a3b7409f13021857720", 10, 1, NULL, 60, 0),   -- Push-ups
(32, "65512a3b7409f13021857720", 10, 1, NULL, 60, 0),   -- Chest dips
(33, "65512a3b7409f13021857720", 10, 1, NULL, 60, 0),   -- Tricep dips
(34, "65512a3b7409f13021857720", 10, 1, NULL, 60, 0),   -- Pull-ups
(35, "65512a3b7409f13021857720", 10, 1, NULL, 60, 0),   -- Box jumps

-- User 2: Strength (intermedia
(1,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Bench press
(2,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Overhead press
(3,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Preacher curls
(4,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Cable rows
(5,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Inverted rows
(6,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Seated cable rows
(7,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Squats
(8,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Leg press
(9,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Standing calf raises
(10, "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Glute bridges
(11, "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Deadlifts
(12, "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Good mornings
(13, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Dumbbell flys
(14, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Reverse flys
(15, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Tricep kickbacks
(16, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Dumbbell pullover
(17, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Tricep pushdowns
(18, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Lateral raises
(19, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Front raises
(20, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Dumbbell rows
(21, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Face pulls
(22, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Rear deltoid raises
(23, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Reverse flys
(24, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Bicep curls
(25, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Lat pulldowns
(26, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Lunges
(27, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Calf raises
(28, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Step-ups
(29, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Leg curls
(30, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Hamstring curls
(31, "65512a7064e79113efca213b", 10, 2, NULL, 60, 0),   -- Push-ups
(32, "65512a7064e79113efca213b", 10, 2, NULL, 60, 0),   -- Chest dips
(33, "65512a7064e79113efca213b", 10, 2, NULL, 60, 0),   -- Tricep dips
(34, "65512a7064e79113efca213b", 10, 2, NULL, 60, 0),   -- Pull-ups
(35, "65512a7064e79113efca213b", 10, 2, NULL, 60, 0),   -- Box jumps

-- User 3: Strength (advanced)
(1,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Bench press
(2,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Overhead press
(3,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Preacher curls
(4,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Cable rows
(5,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Inverted rows
(6,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Seated cable rows
(7,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Squats
(8,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Leg press
(9,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Standing calf raises
(10, "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Glute bridges
(11, "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Deadlifts
(12, "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Good mornings
(13, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Dumbbell flys
(14, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Reverse flys
(15, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Tricep kickbacks
(16, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Dumbbell pullover
(17, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Tricep pushdowns
(18, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Lateral raises
(19, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Front raises
(20, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Dumbbell rows
(21, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Face pulls
(22, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Rear deltoid raises
(23, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Reverse flys
(24, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Bicep curls
(25, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Lat pulldowns
(26, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Lunges
(27, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Calf raises
(28, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Step-ups
(29, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Leg curls
(30, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Hamstring curls
(31, "65512aa4f51452e44ecddaae", 10, 3, NULL, 60, 0),   -- Push-ups
(32, "65512aa4f51452e44ecddaae", 10, 3, NULL, 60, 0),   -- Chest dips
(33, "65512aa4f51452e44ecddaae", 10, 3, NULL, 60, 0),   -- Tricep dips
(34, "65512aa4f51452e44ecddaae", 10, 3, NULL, 60, 0),   -- Pull-ups
(35, "65512aa4f51452e44ecddaae", 10, 3, NULL, 60, 0);   -- Box jumps

-- Insert Cardio Exercises
INSERT INTO UserExercises (exercise_id, user_id, duration, distance, times_completed)
VALUES
(36, "65512ad4f51452e44ecddac4", 15, 1, 0),   -- User 4: Running
(37, "65512b098eaf8db1930f6e56", 20, 4, 0);   -- User 5: Cycling

-- Insert Flexibility-Yoga Exercises
INSERT INTO UserExercises (exercise_id, user_id, duration, difficulty, times_completed)
VALUES
-- User 6: Yoga
(38, "655133dd3e05dd89a157815a", 10, 1, 0),
(39, "655133dd3e05dd89a157815a", 10, 1, 0),
(40, "655133dd3e05dd89a157815a", 10, 1, 0),
(41, "655133dd3e05dd89a157815a", 10, 1, 0),
(42, "655133dd3e05dd89a157815a", 10, 1, 0),
(43, "655133dd3e05dd89a157815a", 10, 1, 0),
(44, "655133dd3e05dd89a157815a", 10, 1, 0),
(45, "655133dd3e05dd89a157815a", 10, 1, 0),
(46, "655133dd3e05dd89a157815a", 10, 1, 0),
(47, "655133dd3e05dd89a157815a", 10, 1, 0),
(48, "655133dd3e05dd89a157815a", 10, 1, 0),
(49, "655133dd3e05dd89a157815a", 10, 1, 0),
(50, "655133dd3e05dd89a157815a", 10, 1, 0),
(51, "655133dd3e05dd89a157815a", 10, 1, 0),
(52, "655133dd3e05dd89a157815a", 10, 1, 0),
(53, "655133dd3e05dd89a157815a", 25, 2, 0),
(54, "655133dd3e05dd89a157815a", 25, 2, 0),
(55, "655133dd3e05dd89a157815a", 25, 2, 0),
(56, "655133dd3e05dd89a157815a", 25, 2, 0),
(57, "655133dd3e05dd89a157815a", 25, 2, 0),
(58, "655133dd3e05dd89a157815a", 25, 2, 0),
(59, "655133dd3e05dd89a157815a", 25, 2, 0),
(60, "655133dd3e05dd89a157815a", 25, 2, 0),
(61, "655133dd3e05dd89a157815a", 25, 2, 0),
(62, "655133dd3e05dd89a157815a", 25, 2, 0),
(63, "655133dd3e05dd89a157815a", 25, 2, 0),
(64, "655133dd3e05dd89a157815a", 25, 2, 0),
(65, "655133dd3e05dd89a157815a", 25, 2, 0),
(66, "655133dd3e05dd89a157815a", 25, 2, 0),
(67, "655133dd3e05dd89a157815a", 40, 3, 0),
(68, "655133dd3e05dd89a157815a", 40, 3, 0),
(69, "655133dd3e05dd89a157815a", 40, 3, 0),
(70, "655133dd3e05dd89a157815a", 40, 3, 0),
(71, "655133dd3e05dd89a157815a", 40, 3, 0),
(72, "655133dd3e05dd89a157815a", 40, 3, 0),
(73, "655133dd3e05dd89a157815a", 40, 3, 0),
(74, "655133dd3e05dd89a157815a", 40, 3, 0),
(75, "655133dd3e05dd89a157815a", 40, 3, 0),
(76, "655133dd3e05dd89a157815a", 40, 3, 0);

-- Insert Flexibility-Stretching Exercises

-- User 7: Stretching
INSERT INTO UserExercises (exercise_id, user_id, duration, difficulty, times_completed)
VALUES
(77,  "655133f67409f13021857cfb", 10, 1, 0),
(78,  "655133f67409f13021857cfb", 10, 1, 0),
(79,  "655133f67409f13021857cfb", 10, 1, 0),
(80,  "655133f67409f13021857cfb", 10, 1, 0),
(81,  "655133f67409f13021857cfb", 10, 1, 0),
(82,  "655133f67409f13021857cfb", 10, 1, 0),
(83,  "655133f67409f13021857cfb", 10, 1, 0),
(84,  "655133f67409f13021857cfb", 10, 1, 0),
(85,  "655133f67409f13021857cfb", 10, 1, 0),
(86,  "655133f67409f13021857cfb", 10, 1, 0),
(87,  "655133f67409f13021857cfb", 10, 1, 0),
(88,  "655133f67409f13021857cfb", 10, 1, 0),
(89,  "655133f67409f13021857cfb", 10, 1, 0),
(90,  "655133f67409f13021857cfb", 10, 1, 0),
(91,  "655133f67409f13021857cfb", 25, 2, 0),
(92,  "655133f67409f13021857cfb", 25, 2, 0),
(93,  "655133f67409f13021857cfb", 25, 2, 0),
(94,  "655133f67409f13021857cfb", 25, 2, 0),
(95,  "655133f67409f13021857cfb", 25, 2, 0),
(96,  "655133f67409f13021857cfb", 25, 2, 0),
(97,  "655133f67409f13021857cfb", 25, 2, 0),
(98,  "655133f67409f13021857cfb", 25, 2, 0),
(99,  "655133f67409f13021857cfb", 25, 2, 0),
(100, "655133f67409f13021857cfb", 25, 2, 0),
(101, "655133f67409f13021857cfb", 25, 2, 0),
(102, "655133f67409f13021857cfb", 25, 2, 0),
(103, "655133f67409f13021857cfb", 25, 2, 0),
(104, "655133f67409f13021857cfb", 25, 2, 0),
(105, "655133f67409f13021857cfb", 40, 3, 0),
(106, "655133f67409f13021857cfb", 40, 3, 0),
(107, "655133f67409f13021857cfb", 40, 3, 0),
(108, "655133f67409f13021857cfb", 40, 3, 0),
(109, "655133f67409f13021857cfb", 40, 3, 0),
(110, "655133f67409f13021857cfb", 40, 3, 0),
(111, "655133f67409f13021857cfb", 40, 3, 0),
(112, "655133f67409f13021857cfb", 40, 3, 0),
(113, "655133f67409f13021857cfb", 40, 3, 0),
(114, "655133f67409f13021857cfb", 40, 3, 0);


CREATE TABLE Workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    exercises JSON NOT NULL,
    date_completed DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- User 1: Strength beginner
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512a3b7409f13021857720", 
  '{ 
    "1": {"reps": 12, "sets": 3, "weight": 40, "rest": 60, "times_completed": 1},
    "2": {"reps": 12, "sets": 3, "weight": 40, "rest": 60, "times_completed": 1},
    "3": {"reps": 12, "sets": 3, "weight": 40, "rest": 60, "times_completed": 1},
    "4": {"reps": 12, "sets": 3, "weight": 40, "rest": 60, "times_completed": 1},
    "7": {"reps": 12, "sets": 3, "weight": 40, "rest": 60, "times_completed": 1},
    "8": {"reps": 12, "sets": 3, "weight": 40, "rest": 60, "times_completed": 1}
  }',
  '1999-02-23 19:34:22'
);
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512a3b7409f13021857720", 
  '{ 
    "13": {"reps": 12, "sets": 3, "weight": 10, "rest": 60, "times_completed": 0},
    "14": {"reps": 12, "sets": 3, "weight": 10, "rest": 60, "times_completed": 0},
    "5":  {"reps": 12, "sets": 3, "weight": 40, "rest": 60, "times_completed": 0},
    "6":  {"reps": 12, "sets": 3, "weight": 40, "rest": 60, "times_completed": 0},
    "9":  {"reps": 12, "sets": 3, "weight": 40, "rest": 60, "times_completed": 0},
    "10": {"reps": 12, "sets": 3, "weight": 40, "rest": 60, "times_completed": 0}
  }',
  '1999-02-24 19:34:22'
);

-- User 2: Strength intermediate
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512a7064e79113efca213b", 
  '{ 
    "1": {"reps": 8, "sets": 4, "weight": 60, "rest": 60, "times_completed": 1},
    "2": {"reps": 8, "sets": 4, "weight": 60, "rest": 60, "times_completed": 1},
    "3": {"reps": 8, "sets": 4, "weight": 60, "rest": 60, "times_completed": 1},
    "4": {"reps": 8, "sets": 4, "weight": 60, "rest": 60, "times_completed": 1},
    "7": {"reps": 8, "sets": 4, "weight": 60, "rest": 60, "times_completed": 1},
    "8": {"reps": 8, "sets": 4, "weight": 60, "rest": 60, "times_completed": 1}
  }',
  '1999-02-23 19:34:22'
);
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512a7064e79113efca213b", 
  '{ 
    "13": {"reps": 8, "sets": 4, "weight": 25, "rest": 60, "times_completed": 0},
    "14": {"reps": 8, "sets": 4, "weight": 25, "rest": 60, "times_completed": 0},
    "5":  {"reps": 8, "sets": 4, "weight": 60, "rest": 60, "times_completed": 0},
    "6":  {"reps": 8, "sets": 4, "weight": 60, "rest": 60, "times_completed": 0},
    "9":  {"reps": 8, "sets": 4, "weight": 60, "rest": 60, "times_completed": 0},
    "10": {"reps": 8, "sets": 4, "weight": 60, "rest": 60, "times_completed": 0}
  }',
  '1999-02-24 19:34:22'
);

-- User 3: Strength advanced
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512aa4f51452e44ecddaae", 
  '{ 
    "1": {"reps": 8, "sets": 3, "weight": 90, "rest": 90, "times_completed": 1},
    "2": {"reps": 8, "sets": 3, "weight": 90, "rest": 90, "times_completed": 1},
    "3": {"reps": 8, "sets": 3, "weight": 90, "rest": 90, "times_completed": 1},
    "4": {"reps": 8, "sets": 3, "weight": 90, "rest": 90, "times_completed": 1},
    "7": {"reps": 8, "sets": 3, "weight": 90, "rest": 90, "times_completed": 1},
    "8": {"reps": 8, "sets": 3, "weight": 90, "rest": 90, "times_completed": 1}
  }',
  '1999-02-23 19:34:22'
);

INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512aa4f51452e44ecddaae", 
  '{ 
    "13": {"reps": 5, "sets": 5, "weight": 45, "rest": 90, "times_completed": 0},
    "14": {"reps": 5, "sets": 5, "weight": 45, "rest": 90, "times_completed": 0},
    "5":  {"reps": 5, "sets": 5, "weight": 90, "rest": 90, "times_completed": 0},
    "6":  {"reps": 5, "sets": 5, "weight": 90, "rest": 90, "times_completed": 0},
    "9":  {"reps": 5, "sets": 5, "weight": 90, "rest": 90, "times_completed": 0},
    "10": {"reps": 5, "sets": 5, "weight": 90, "rest": 90, "times_completed": 0}
  }',
  '1999-02-24 19:34:22'
);

-- User 4: Cardio running
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512ad4f51452e44ecddac4", 
  '{ 
    "36": {"duration": 40, "distance": 10}
  }',
  '1999-02-24 19:34:22'
);

-- User 5: Cardio cycling
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512b098eaf8db1930f6e56", 
  '{ 
    "37": {"duration": 30, "distance": 3}
  }',
  '1999-02-24 19:34:22'
);

-- User 6: Flexibility yoga
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "655133dd3e05dd89a157815a", 
  '{ 
    "38": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "39": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "40": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "41": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "42": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "43": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "44": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "45": {"duration": 10, "difficulty": 1, "times_completed": 0}
  }',
  '1999-02-23 19:34:22'
);

-- User 7: Flexibility stretching
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "655133f67409f13021857cfb", 
  '{ 
    "77": {"duration": 10, "difficulty": 1, "times_completed": 1},
    "78": {"duration": 10, "difficulty": 1, "times_completed": 1},
    "79": {"duration": 10, "difficulty": 1, "times_completed": 1},
    "80": {"duration": 10, "difficulty": 1, "times_completed": 1},
    "81": {"duration": 10, "difficulty": 1, "times_completed": 1},
    "82": {"duration": 10, "difficulty": 1, "times_completed": 1},
    "83": {"duration": 10, "difficulty": 1, "times_completed": 1},
    "84": {"duration": 10, "difficulty": 1, "times_completed": 1}
  }',
  '1999-02-23 19:34:22'
);

INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "655133f67409f13021857cfb", 
  '{ 
    "85": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "86": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "87": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "88": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "89": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "90": {"duration": 10, "difficulty": 1, "times_completed": 0},
    "77": {"duration": 10, "difficulty": 1, "times_completed": 1},
    "78": {"duration": 10, "difficulty": 1, "times_completed": 1}
  }',
  '1999-02-23 19:34:22'
);

CREATE TABLE Surveys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    datetime DATETIME,
    reps  ENUM('1', '2', '3'),
    sets  ENUM('1', '2', '3'),
    weight  ENUM('1', '2', '3'),
    rest  ENUM('1', '2', '3'),
    difficulty ENUM('1', '2', '3'),
    duration  ENUM('1', '2', '3'),
    distance  ENUM('1', '2', '3'),
    FOREIGN KEY (exercise_id) REFERENCES Exercises(id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
