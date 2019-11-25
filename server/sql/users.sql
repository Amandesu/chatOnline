CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(15) NOT NULL,
    `password` varchar(15) NOT NULL,
    `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
    `posterUrl` text,
    `aliaName` varchar(15) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2515898 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci