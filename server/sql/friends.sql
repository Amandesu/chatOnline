CREATE TABLE `friends` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user` varchar(15) NOT NULL,
    `friend` varchar(15) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_2` (`user`,`friend`),
    KEY `user` (`user`),
    CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`)
  ) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci