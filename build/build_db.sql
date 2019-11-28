CREATE TABLE IF NOT EXISTS `users`
(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `username` TEXT UNIQUE,
  `hash` TEXT,
  `isAdmin` TEXT
);

CREATE TABLE IF NOT EXISTS `games` 
(
    `gameID` INTEGER PRIMARY KEY AUTOINCREMENT,
    `title` TEXT NOT NULL UNIQUE,
    `platforms` TEXT,
    `slugline` TEXT,
    `summary` TEXT,
    `releaseDate` TEXT,
    `developer` TEXT,
    `publisher` TEXT,
    `submittedBy` INT,
    `approved` TEXT,
    `poster` TEXT,
    `splash` TEXT
);

CREATE TABLE IF NOT EXISTS `reviews`
(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user` TEXT,
  `game` INTEGER,
  `review_score` INT,
  `review_text` TEXT,
  `review_date` DATE,
  `approved` TEXT
);

CREATE TABLE IF NOT EXISTS 'platforms'
(
  'id' INTEGER PRIMARY KEY,
  'name' TEXT
);

INSERT INTO `games` VALUES 
  (1, 
  'The Last of Us', 
  '31',
  'Hope is the key to survival.', 
  'Set in the post-apocalyptic United States, the game tells the story of survivors Joel and Ellie as they work together to survive their westward journey across what remains of the country to find a possible cure for the modern fungal plague that has nearly decimated the entire human race.', 
  '04/06/2013', 
  'Naughty Dog', 
  'Sony Computer Entertainment', 
  1,
  'yes', 
  'tlou.jpg', 
  'tlousplash.jpg');

INSERT INTO `games` VALUES 
  (2, 
  'The Legend of Zelda: Breath of the Wild', 
  '34,37',
  'Step into a world of discovery, exploration and adventure.', 
  'No kingdom. No memories. After a 100-year slumber, Link wakes up alone in a world he no longer remembers. Now the legendary hero must explore a vast and dangerous land and regain his memories before Hyrule is lost forever. Armed only with what he can scavenge, Link sets out to find answers and the resources needed to survive.', 
  '03/03/2017', 
  'Nintendo EPD', 
  'Nintendo', 
  2, 
  'yes', 
  'botw.jpg', 
  'botwsplash.jpg');

INSERT INTO `games` VALUES 
  (3,
  "Marvel's Spider-Man", 
  '36',
  'Be Greater.', 
  'After eight years behind the mask, Peter Parker is a crime-fighting expert. Feel the full power of a more experienced Spider-Man with improvisational combat, dynamic acrobatics, fluid urban traversal, and environmental interactions. A rookie no longer, this is the most masterful Spider-Man you’ve ever played.', 
  '07/09/2018', 
  'Insomniac Games', 
  'Sony Interactive Entertainment', 
  2, 
  'yes', 
  'spiderman.jpg', 
  'spidermansplash.jpg');

INSERT INTO `games` VALUES 
  (4,
  "Football Manager 2020", 
  '38,37,39,40,41',
  'Your club, your way.', 
  'Manage your football club, your way. Every decision counts in FM20 with new features rewarding planning and progression like never before, empowering managers to develop both your club’s and your own unique managerial identity.', 
  '19/11/2019', 
  'Sports Interactive', 
  'SEGA', 
  1, 
  'yes', 
  'fm20poster.jpg', 
  'fm20splash.jpg');

INSERT INTO `games` VALUES 
  (5,
  "Star Wars Jedi: Fallen Order", 
  '36,35,38',
  'Become a Jedi.', 
  'The Empire seeks to eradicate all Jedi after the execution of Order 66. You, a Jedi Padawan-turned-fugitive, must fight for your survival as you explore the mysteries of a long-extinct civilization in hopes of rebuilding the Jedi Order.', 
  '15/11/2019', 
  'Respawn Entertainment', 
  'Electronic Arts', 
  2, 
  'yes', 
  'starwarsjfoposter.jpg', 
  'starwarsjfosplash.jpg');

INSERT INTO 'platforms' VALUES (1, 'Atari 2600');
INSERT INTO 'platforms' VALUES (2, 'Color TV-Game');
INSERT INTO 'platforms' VALUES (3, 'Magnavox Odyssey');
INSERT INTO 'platforms' VALUES (4, 'Intellivision');
INSERT INTO 'platforms' VALUES (5, 'Atari 5200');
INSERT INTO 'platforms' VALUES (6, 'ColecoVision');
INSERT INTO 'platforms' VALUES (7, 'Nintendo Entertainment System');
INSERT INTO 'platforms' VALUES (8, 'Master System');
INSERT INTO 'platforms' VALUES (9, 'TurboGrafx-16');
INSERT INTO 'platforms' VALUES (10, 'Sega Genesis');
INSERT INTO 'platforms' VALUES (11, 'Atari Lynx');
INSERT INTO 'platforms' VALUES (12, 'Game Boy');
INSERT INTO 'platforms' VALUES (13, 'SNES');
INSERT INTO 'platforms' VALUES (14, 'Sega Game Gear');
INSERT INTO 'platforms' VALUES (15, 'Philips CD-i');
INSERT INTO 'platforms' VALUES (16, 'Sega Pico');
INSERT INTO 'platforms' VALUES (17, 'Sega Saturn');
INSERT INTO 'platforms' VALUES (18, 'PlayStation');
INSERT INTO 'platforms' VALUES (19, 'Nintendo 64');
INSERT INTO 'platforms' VALUES (20, 'Dreamcast');
INSERT INTO 'platforms' VALUES (21, 'WonderSwan');
INSERT INTO 'platforms' VALUES (22, 'PlayStation 2');
INSERT INTO 'platforms' VALUES (23, 'Xbox');
INSERT INTO 'platforms' VALUES (24, 'Game Boy Advance');
INSERT INTO 'platforms' VALUES (25, 'GameCube');
INSERT INTO 'platforms' VALUES (26, 'N-Gage');
INSERT INTO 'platforms' VALUES (27, 'Nintendo DS');
INSERT INTO 'platforms' VALUES (28, 'PlayStation Portable');
INSERT INTO 'platforms' VALUES (29, 'Xbox 360');
INSERT INTO 'platforms' VALUES (30, 'Nintendo Wii');
INSERT INTO 'platforms' VALUES (31, 'PlayStation 3');
INSERT INTO 'platforms' VALUES (32, 'Nintendo 3DS ');
INSERT INTO 'platforms' VALUES (33, 'PlayStation Vita');
INSERT INTO 'platforms' VALUES (34, 'Wii U');
INSERT INTO 'platforms' VALUES (35, 'Xbox One');
INSERT INTO 'platforms' VALUES (36, 'PlayStation 4');
INSERT INTO 'platforms' VALUES (37, 'Nintendo Switch');
INSERT INTO 'platforms' VALUES (38, 'Microsoft Windows');
INSERT INTO 'platforms' VALUES (39, 'macOS');
INSERT INTO 'platforms' VALUES (40, 'iOS');
INSERT INTO 'platforms' VALUES (41, 'Google Stadia');
INSERT INTO 'platforms' VALUES (42, 'Linux');

INSERT INTO `users` (`username`, `hash`, `isAdmin`) VALUES ('admin', '$2b$12$niVK8DnXKSyYzAIOUun2C.PZ51waVc2NU/e7DQ9cYM6zxNwUiiOCG', 'yes');
INSERT INTO `users` (`username`, `hash`, `isAdmin`) VALUES ('user', '$2b$12$niVK8DnXKSyYAIOUun2C.PZ51waVc2NU/e7DQ9cYM6zxNwUiiOCG', 'no');

