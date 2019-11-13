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
    `summary` TEXT,
    `imageSrc` TEXT,
    `rating` INT,
    `submittedBy` TEXT
);