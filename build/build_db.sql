CREATE TABLE `users`
(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `username` TEXT UNIQUE,
  `hash` TEXT,
  `isAdmin` TEXT
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
    `submittedBy` INT,
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
