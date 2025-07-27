CREATE TABLE `accademic_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `accademic_year` year(4) NOT NULL,
  `course_applied` varchar(50) NOT NULL,
  `select_medium` enum('English','Telugu') NOT NULL DEFAULT 'English',
  `II_language` enum('Telugu','Hindi') NOT NULL DEFAULT 'Telugu',
  `ssc_pass_year` year(4) NOT NULL,
  `ssc_hallticket_no` int(11) NOT NULL,
  `school_name` varchar(100) NOT NULL,
  `board_name` varchar(100) NOT NULL,
  `pass_type` varchar(100) NOT NULL,
  `total_marks` int(11) NOT NULL,
  `grade_percentage` int(11) NOT NULL,
  `place_study` varchar(100) NOT NULL,
  `english_gpa` int(11) NOT NULL,
  `maths_gpa` int(11) NOT NULL,
  `science_gpa` int(11) NOT NULL,
  `social_gpa` int(11) NOT NULL,
  `extra_curicular_activities` set('PH','Sports','NCC','NSS','Ex-Service Man') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `user_id` (`user_id`),
  CONSTRAINT `accademic_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci


INSERT INTO `accademic_details` (`id`, `user_id`, `accademic_year`, `course_applied`, `select_medium`, `II_language`, `ssc_pass_year`, `ssc_hallticket_no`, `school_name`, `board_name`, `pass_type`, `total_marks`, `grade_percentage`, `place_study`, `english_gpa`, `maths_gpa`, `science_gpa`, `social_gpa`, `created_at`, `updated_at`) VALUES (NULL, '1', '2020', 'MPC', 'English', 'Telugu', '2020', '123456789', 'Sri Vidya High Schoool', 'SSC', 'Regular', '550', '90', 'Adoni', '90', '95', '99', '96', current_timestamp(), current_timestamp());