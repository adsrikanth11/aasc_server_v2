CREATE TABLE users (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   username VARCHAR(100) NOT NULL UNIQUE, 
   password VARCHAR(100) NOT NULL , 
   role ENUM('student','teaching','non_teaching','admin') NOT NULL DEFAULT 'student' ,
   email VARCHAR(100) NOT NULL UNIQUE, 
   is_email_verified tinyint(1) DEFAULT 0,
   mobile CHAR(10) NOT NULL UNIQUE, 
   is_mobile_verified tinyint(1) DEFAULT 0,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
   updated_at DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
) ENGINE = InnoDB;

INSERT INTO `users` (`id`, `username`, `password`, `role`, `email`, `is_email_verified`, `mobile`, `is_mobile_verified`, `created_at`, `updated_at`) 
VALUES (NULL, 'srikanth', '123456', 'student', 'srikanth@gmail.com', '0', '9876543214', '0', current_timestamp(), current_timestamp());