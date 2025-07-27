CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `door_no` varchar(100) NOT NULL,
  `street_name` varchar(100) NOT NULL,
  `city_village_name` varchar(100) NOT NULL,
  `mandal_name` varchar(100) NOT NULL,
  `district_name` varchar(100) NOT NULL,
  `state_name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `user_id` (`user_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

-- Insert
INSERT INTO `address` (`id`, `user_id`, `door_no`, `street_name`, `city_village_name`, `mandal_name`, `district_name`, `state_name`, `created_at`, `updated_at`) VALUES (NULL, '1', '234234', 'lions club colony', 'bychegeri', 'adoni', 'kurnool', 'AP', current_timestamp(), current_timestamp());

-- Create
CREATE TABLE `aasc_db_2`.`user_address` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `door_no` VARCHAR(100) NOT NULL , `street_name` VARCHAR(100) NOT NULL , `city_village_name` VARCHAR(100) NOT NULL , `mandal_name` VARCHAR(100) NOT NULL , `district_name` VARCHAR(100) NOT NULL , `state_name` VARCHAR(100) NOT NULL , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;