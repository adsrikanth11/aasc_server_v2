CREATE TABLE students (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   user_id INT NOT NULL,
   full_name VARCHAR(100) NOT NULL, 
   dob DATE NOT NULL , 
   age CHAR(2) NOT NULL,
   gender ENUM('male','female') NOT NULL DEFAULT 'male',
   aadhaar_no VARCHAR(100) NOT NULL,
   mother_tongue VARCHAR(100) NOT NULL,
   caste VARCHAR(100) NOT NULL,
   religion VARCHAR(100) NOT NULL,
   identity_marks Text(100) NOT NULL,
   profile_image VARCHAR(200) NOT NULL,
   signature VARCHAR(200) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
   updated_at DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
) ENGINE = InnoDB;

-- 1
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `age` char(2) NOT NULL,
  `gender` enum('male','female') NOT NULL DEFAULT 'male',
  `aadhaar_no` char(12) NOT NULL,
  `caste` varchar(100) NOT NULL,
  `religion` varchar(100) NOT NULL,
  `identity_marks` text NOT NULL,
  `mother_tongue` varchar(100) NOT NULL,
  `profile_image` varchar(100) NOT NULL,
  `signature` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `user_id` (`user_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

INSERT INTO `students` (`id`, `user_id`, `full_name`, `dob`, `age`, `gender`, `aadhaar_no`, `caste`, `religion`, `identity_marks`, `mother_tongue`, `profile_image`, `signature`, `created_at`, `updated_at`) VALUES (NULL, '1', 'Ambal Dhage Srikanth', '2025-07-01', '30', 'male', '0123456789123', 'Swakula Sali', 'Hindu', 'sdfsfd fsdfsfd\r\ncvbcvbcbv werwrwr', 'Marathi', 'profile_image_4545645', 'signature_4564654', current_timestamp(), current_timestamp());