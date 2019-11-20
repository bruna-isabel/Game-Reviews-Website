CREATE TABLE `users`
(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `username` TEXT UNIQUE,
  `hash` TEXT
);

CREATE TABLE `games` 
(
    `gameID` INTEGER PRIMARY KEY AUTOINCREMENT,
    `title` TEXT NOT NULL UNIQUE,
    `slugline` TEXT,
    `summary` TEXT,
    `releaseDate` TEXT,
    `director` TEXT,
    `publisher` TEXT,
    `rating` INT,
    `submittedBy` TEXT,
    `approved` TEXT,
    `poster` TEXT,
    `splash` TEXT
);

CREATE TABLE `reviews`
(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user` TEXT,
  `game` TEXT,
  `review_score` INT,
  `review_text` TEXT,
  `review_date` DATE,
  `approved` TEXT
);

INSERT INTO `games` VALUES (1, 'game1', 'slugline', 'summary', 'releaseDate', 'director', 'publisher', 5, 'user', 'no', 'poster', 'splash');
INSERT INTO `games` VALUES (2, 'game2', 'slugline', 'summary', 'releaseDate', 'director', 'publisher', 5, 'user', 'no', 'poster', 'splash');
INSERT INTO `games` VALUES (3, 'game3', 'slugline', 'summary', 'releaseDate', 'director', 'publisher', 5, 'user', 'no', 'poster', 'splash');
