CREATE TABLE IF NOT EXISTS `users`
(
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `username` TEXT UNIQUE,
  `hash` TEXT,
  `isAdmin` TEXT
);

CREATE TABLE IF NOT EXISTS `categories`
(
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `name` TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS `gameCategories`
(
  `gameID` INTEGER REFERENCES `games` (`id`),
  `categoryID` INTEGER REFERENCES `categories` (`id`),

  PRIMARY KEY (`gameID`, `categoryID`)
);

CREATE TABLE IF NOT EXISTS `games`
(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT NOT NULL,
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
  `reviewScore` INT,
  `reviewText` TEXT,
  `reviewDate` DATE,
  `approved` TEXT
);

CREATE TABLE IF NOT EXISTS `reviewComments`
(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `gameID` INTEGER,
  `reviewID` INTEGER,
  `user` TEXT,
  `commentDate` DATE,
  `commentTime` TEXT,
  `commentText` TEXT
);

CREATE TABLE IF NOT EXISTS `platforms`
(
  `id` INTEGER PRIMARY KEY,
  `name` TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS `gamePlatforms` (
  `gameID` INTEGER REFERENCES `games` (`id`),
  `platformID` INTEGER REFERENCES `platforms` (`id`),

  PRIMARY KEY (`gameID`, `platformID`)
);
