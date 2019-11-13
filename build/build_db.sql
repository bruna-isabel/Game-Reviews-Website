CREATE TABLE `users`
(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `username` TEXT UNIQUE,
  `hash` TEXT
);

CREATE TABLE `games` 
(
    `gameID` INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT,
    `title` TEXT) NOT NULL UNIQUE,
    `summary` varchar(100),
    `imageSrc` TEXT,
    `rating` INT,
    `submittedBy` TEXT FOREIGN KEY REFERENCES users(id)
);