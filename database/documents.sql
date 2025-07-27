CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `doc_name` varchar(200) NOT NULL,
  `doc_type` varchar(100) NOT NULL,
  `uploaded_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `user_id` (`user_id`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci


INSERT INTO `documents` (`id`, `user_id`, `doc_name`, `doc_type`, `uploaded_at`, `updated_at`) 
VALUES (NULL, '1', 'ssc_cerificate', 'image', current_timestamp(), current_timestamp());