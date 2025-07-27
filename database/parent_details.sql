CREATE TABLE `parent_details` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `student_id` int NOT NULL,
  `father_name` varchar(100) NOT NULL,
  `father_aadhaar_no` char(12) NOT NULL,
  `mother_name` varchar(100) NOT NULL,
  `mother_aadhaar_no` char(12) NOT NULL,
  `guardian_name` varchar(100) DEFAULT NULL,
  `guardian_aadhaar_no` char(12) DEFAULT NULL,
  `father_occupation` varchar(100) NOT NULL,
  `annual_income` int NOT NULL,
  `parent_mobile_no` char(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `student_id` (`student_id`),
  CONSTRAINT `parent_details_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci


INSERT INTO `parent_details` (`id`, `student_id`, `father_name`, `father_aadhaar_no`, `mother_name`, `mother_aadhaar_no`, `guardian_name`, `guardian_aadhaar_no`, `father_occupation`, `annual_income`, `parent_mobile_no`, `created_at`, `updated_at`) 
VALUES ('', '1', 'father name', '012345678912', 'mother name', '012345678932', 'Guardian name', '012345678932', 'Bussiness man', '500000', '9876543214', current_timestamp(), current_timestamp());