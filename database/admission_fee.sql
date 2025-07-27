CREATE TABLE `admission_fee` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `student_id` int NOT NULL,
  `admission_id` varchar(100) NOT NULL UNIQUE,
  `amount` int NOT NULL,
  `status` enum('pending','created','paid','failed') NOT NULL DEFAULT 'pending',
  `order_id` varchar(100) NOT NULL,
  `payment_id` varchar(100) NOT NULL,
  `payed_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `student_id` (`student_id`),
  CONSTRAINT `admission_fee_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci