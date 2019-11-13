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
    `submittedBy` TEXT,
    `approved` TEXT
);

INSERT INTO `games` VALUES(1, 'game1', 'summary', 'url', 5, 'matthew', 'yes');
INSERT INTO `games` VALUES(2, 'game2', 'summary', 'url', 5, 'matthew', 'no');
INSERT INTO `games` VALUES(3, 'game3', 'summary', 'url', 5, 'matthew', 'no');
INSERT INTO `games` VALUES(4, 'game4', 'summary', 'url', 5, 'matthew', 'yes');
INSERT INTO `games` VALUES(5, 'game5', 'summary', 'url', 5, 'matthew', 'no');
INSERT INTO `games` VALUES(6, 'game6', 'summary', 'url', 5, 'matthew', 'yes');
INSERT INTO `games` VALUES(7, 'game7', 'summary', 'url', 5, 'matthew', 'no');
INSERT INTO `games` VALUES(8, 'game8', 'summary', 'url', 5, 'matthew', 'yes');
INSERT INTO `games` VALUES(9, 'game9', 'summary', 'url', 5, 'matthew', 'no');