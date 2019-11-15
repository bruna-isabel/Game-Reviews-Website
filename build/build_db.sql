CREATE TABLE IF NOT EXISTs`users`
(
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `username` TEXT UNIQUE,
  `hash` TEXT
);

CREATE TABLE IF NOT EXISTS `games`
(
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `title` TEXT NOT NULL UNIQUE,
  `summary` TEXT,
  `imageSrc` TEXT,
  `rating` INT,
  `submittedBy` INT REFERENCES `users` (`id`)
);
