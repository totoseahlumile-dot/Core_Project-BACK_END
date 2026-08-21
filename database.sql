-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: moderntech_hr
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendance_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `attendance_date` date NOT NULL,
  `check_in` datetime DEFAULT NULL,
  `check_out` datetime DEFAULT NULL,
  `status` enum('Present','Absent','Late','Half Day','Remote','On Leave') COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`attendance_id`),
  UNIQUE KEY `uq_attendance_employee_date` (`employee_id`,`attendance_date`),
  KEY `idx_attendance_date_status` (`attendance_date`,`status`),
  KEY `idx_attendance_employee_date` (`employee_id`,`attendance_date`),
  CONSTRAINT `fk_attendance_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_attendance_times` CHECK (((`check_out` is null) or (`check_in` is null) or (`check_out` >= `check_in`)))
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,1,'2025-07-25',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(2,1,'2025-07-26',NULL,NULL,'Absent',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(3,1,'2025-07-27',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(4,1,'2025-07-28',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(5,1,'2025-07-29',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(6,2,'2025-07-25',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(7,2,'2025-07-26',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(8,2,'2025-07-27',NULL,NULL,'Absent',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(9,2,'2025-07-28',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(10,2,'2025-07-29',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(11,3,'2025-07-25',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(12,3,'2025-07-26',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(13,3,'2025-07-27',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(14,3,'2025-07-28',NULL,NULL,'Absent',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(15,3,'2025-07-29',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(16,10,'2025-07-25',NULL,NULL,'Absent',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(17,9,'2025-07-25',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(18,8,'2025-07-25',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(19,7,'2025-07-25',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(20,6,'2025-07-25',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(21,5,'2025-07-25',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(22,4,'2025-07-25',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(23,10,'2025-07-26',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(24,9,'2025-07-26',NULL,NULL,'Absent',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(25,8,'2025-07-26',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(26,7,'2025-07-26',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(27,6,'2025-07-26',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(28,5,'2025-07-26',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(29,4,'2025-07-26',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(30,10,'2025-07-27',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(31,9,'2025-07-27',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(32,8,'2025-07-27',NULL,NULL,'Absent',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(33,7,'2025-07-27',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(34,6,'2025-07-27',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(35,5,'2025-07-27',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(36,4,'2025-07-27',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(37,10,'2025-07-28',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(38,9,'2025-07-28',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(39,8,'2025-07-28',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(40,7,'2025-07-28',NULL,NULL,'Absent',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(41,6,'2025-07-28',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(42,5,'2025-07-28',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(43,4,'2025-07-28',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(44,10,'2025-07-29',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(45,9,'2025-07-29',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(46,8,'2025-07-29',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(47,7,'2025-07-29',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(48,6,'2025-07-29',NULL,NULL,'Absent',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(49,5,'2025-07-29',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(50,4,'2025-07-29',NULL,NULL,'Present',NULL,'2026-08-20 19:20:02','2026-08-20 19:20:02'),(80,11,'2026-08-02',NULL,NULL,'Present',NULL,'2026-08-20 19:43:56','2026-08-20 19:43:56'),(82,13,'2026-08-13',NULL,NULL,'Present',NULL,'2026-08-20 19:47:10','2026-08-20 19:47:10'),(84,15,'2026-08-21',NULL,NULL,'Present',NULL,'2026-08-20 19:48:08','2026-08-20 19:48:08'),(86,17,'2026-08-22',NULL,NULL,'Present',NULL,'2026-08-20 19:49:01','2026-08-20 19:49:01'),(88,19,'2026-08-21','2026-08-21 05:48:59',NULL,'Present',NULL,'2026-08-21 03:48:59','2026-08-21 03:48:59'),(89,8,'2026-08-21','2026-08-21 06:23:10','2026-08-21 06:23:41','Present',NULL,'2026-08-21 04:23:10','2026-08-21 04:23:41');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_attendance_updated_at` BEFORE UPDATE ON `attendance` FOR EACH ROW BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_log` (
  `audit_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `action_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `table_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `record_id` int DEFAULT NULL,
  `old_value` json DEFAULT NULL,
  `new_value` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`audit_id`),
  KEY `fk_audit_user` (`user_id`),
  KEY `idx_audit_table_record` (`table_name`,`record_id`),
  KEY `idx_audit_created_at` (`created_at`),
  CONSTRAINT `fk_audit_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
INSERT INTO `audit_log` VALUES (1,2,'STATUS_CHANGE','leave_requests',4,'{\"status\": \"Pending\"}','{\"status\": \"Approved\"}','2026-08-20 23:59:35'),(2,2,'STATUS_CHANGE','leave_requests',5,'{\"status\": \"Pending\"}','{\"status\": \"Denied\"}','2026-08-21 00:00:13');
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_settings`
--

DROP TABLE IF EXISTS `company_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_settings` (
  `setting_id` int NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`setting_id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_settings`
--

LOCK TABLES `company_settings` WRITE;
/*!40000 ALTER TABLE `company_settings` DISABLE KEYS */;
INSERT INTO `company_settings` VALUES (1,'company_name','ModernTech Solutions','2026-08-20 19:20:11'),(2,'default_currency','ZAR','2026-08-20 19:20:11'),(3,'working_hours_per_day','8','2026-08-20 19:20:11'),(4,'working_days_per_week','5','2026-08-20 19:20:11'),(5,'timezone','Africa/Johannesburg','2026-08-20 19:20:11'),(6,'company_phone','+123123217923','2026-08-21 04:22:25'),(7,'company_email','finalui@yandex.com','2026-08-21 04:22:25');
/*!40000 ALTER TABLE `company_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `department_name` (`department_name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Development','Software development and engineering','2026-08-20 19:20:00'),(2,'HR','Human resources and employee management','2026-08-20 19:20:00'),(3,'QA','Quality assurance and testing','2026-08-20 19:20:00'),(4,'Sales','Sales and customer acquisition','2026-08-20 19:20:00'),(5,'Marketing','Marketing and communications','2026-08-20 19:20:00'),(6,'Design','UI/UX and product design','2026-08-20 19:20:00'),(7,'IT','Information technology and infrastructure','2026-08-20 19:20:00'),(8,'Finance','Finance and accounting','2026-08-20 19:20:00'),(9,'Support','Customer and technical support','2026-08-20 19:20:00'),(10,'TestDept1787255036110','Smoke test department','2026-08-20 19:43:56'),(11,'TestDept1787255229819','Smoke test department','2026-08-20 19:47:10'),(12,'TestDept1787255287364','Smoke test department','2026-08-20 19:48:08'),(13,'TestDept1787255340717','Smoke test department','2026-08-20 19:49:01');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_settings`
--

DROP TABLE IF EXISTS `employee_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_settings` (
  `employee_setting_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `setting_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_setting_id`),
  UNIQUE KEY `uq_employee_setting` (`employee_id`,`setting_key`),
  KEY `idx_employee_settings_employee` (`employee_id`),
  CONSTRAINT `fk_employee_setting_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_settings`
--

LOCK TABLES `employee_settings` WRITE;
/*!40000 ALTER TABLE `employee_settings` DISABLE KEYS */;
INSERT INTO `employee_settings` VALUES (1,1,'theme','light','2026-08-20 19:20:11'),(2,2,'theme','light','2026-08-20 19:20:11'),(3,3,'theme','light','2026-08-20 19:20:11'),(4,4,'theme','light','2026-08-20 19:20:11'),(5,5,'theme','light','2026-08-20 19:20:11'),(6,6,'theme','light','2026-08-20 19:20:11'),(7,7,'theme','light','2026-08-20 19:20:11'),(8,8,'theme','light','2026-08-20 19:20:11'),(9,9,'theme','light','2026-08-20 19:20:11'),(10,10,'theme','light','2026-08-20 19:20:11'),(16,19,'phone','012 456 7896','2026-08-20 23:48:23'),(17,8,'phone','0748600963','2026-08-20 23:49:40'),(18,8,'language_currency','English, ZAR','2026-08-20 23:49:55'),(19,8,'notify_email','true','2026-08-21 04:24:00'),(20,8,'notify_sms','true','2026-08-21 04:24:00'),(21,8,'notify_updates','true','2026-08-21 04:24:00');
/*!40000 ALTER TABLE `employee_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `employee_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position_id` int NOT NULL,
  `salary` decimal(12,2) NOT NULL DEFAULT '0.00',
  `employment_status` enum('Active','Inactive','On Leave','Terminated') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
  `hire_date` date NOT NULL,
  `termination_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_number` (`employee_number`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_employees_position` (`position_id`),
  KEY `idx_employees_status` (`employment_status`),
  KEY `idx_employees_name` (`last_name`,`first_name`),
  CONSTRAINT `fk_employees_position` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_employee_dates` CHECK (((`termination_date` is null) or (`termination_date` >= `hire_date`))),
  CONSTRAINT `chk_employee_salary` CHECK ((`salary` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'EMP001','Sibongile','Nkosi','sibongile.nkosi@moderntech.com',NULL,1,70000.00,'Active','2015-01-01',NULL,'2026-08-20 19:20:01','2026-08-20 19:20:01'),(2,'EMP002','Lungile','Moyo','lungile.moyo@moderntech.com',NULL,2,80000.00,'Active','2013-01-01',NULL,'2026-08-20 19:20:01','2026-08-20 19:20:01'),(3,'EMP003','Thabo','Molefe','thabo.molefe@moderntech.com',NULL,3,55000.00,'Active','2018-01-01',NULL,'2026-08-20 19:20:01','2026-08-20 19:20:01'),(4,'EMP004','Keshav','Naidoo','keshav.naidoo@moderntech.com',NULL,4,60000.00,'Active','2020-01-01',NULL,'2026-08-20 19:20:01','2026-08-20 19:20:01'),(5,'EMP005','Zanele','Khumalo','zanele.khumalo@moderntech.com',NULL,5,58000.00,'Active','2019-01-01',NULL,'2026-08-20 19:20:01','2026-08-20 19:20:01'),(6,'EMP006','Sipho','Zulu','sipho.zulu@moderntech.com',NULL,6,65000.00,'Active','2016-01-01',NULL,'2026-08-20 19:20:01','2026-08-20 19:20:01'),(7,'EMP007','Naledi','Moeketsi','naledi.moeketsi@moderntech.com',NULL,7,72000.00,'Active','2017-01-01',NULL,'2026-08-20 19:20:01','2026-08-20 19:20:01'),(8,'EMP008','Farai','Gumbo','farai.gumbo@moderntech.com',NULL,8,56000.00,'Active','2021-01-01',NULL,'2026-08-20 19:20:01','2026-08-20 19:20:01'),(9,'EMP009','Karabo','Dlamini','karabo.dlamini@moderntech.com',NULL,9,62000.00,'Active','2018-01-01',NULL,'2026-08-20 19:20:01','2026-08-20 19:20:01'),(10,'EMP010','Fatima','Patel','fatima.patel@moderntech.com',NULL,10,58000.00,'Active','2016-01-01',NULL,'2026-08-20 19:20:01','2026-08-20 19:20:01'),(11,'EMP1787255036110','Updated','User','test1787255036110@moderntech.com',NULL,1,55000.00,'Active','2026-01-01',NULL,'2026-08-20 19:43:56','2026-08-20 19:43:56'),(13,'EMP1787255229819','Updated','User','test1787255229819@moderntech.com',NULL,1,55000.00,'Active','2026-01-01',NULL,'2026-08-20 19:47:10','2026-08-20 19:47:10'),(15,'EMP1787255287364','Updated','User','test1787255287364@moderntech.com',NULL,1,55000.00,'Active','2026-01-01',NULL,'2026-08-20 19:48:08','2026-08-20 19:48:08'),(17,'EMP1787255340717','Updated','User','test1787255340717@moderntech.com',NULL,1,55000.00,'Active','2026-01-01',NULL,'2026-08-20 19:49:00','2026-08-20 19:49:01'),(19,'EMP012','Ahlumile','Totose','totose.ahlumile@moderntech.com',NULL,9,600000.00,'Active','2026-08-27',NULL,'2026-08-20 22:15:46','2026-08-20 22:15:46');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_employees_updated_at` BEFORE UPDATE ON `employees` FOR EACH ROW BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `employment_history`
--

DROP TABLE IF EXISTS `employment_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employment_history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `position_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `notes` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`history_id`),
  KEY `fk_history_position` (`position_id`),
  KEY `idx_history_employee_dates` (`employee_id`,`start_date`,`end_date`),
  CONSTRAINT `fk_history_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_history_position` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_history_dates` CHECK (((`end_date` is null) or (`end_date` >= `start_date`)))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employment_history`
--

LOCK TABLES `employment_history` WRITE;
/*!40000 ALTER TABLE `employment_history` DISABLE KEYS */;
INSERT INTO `employment_history` VALUES (1,1,1,'2015-01-01',NULL,'Initial employment \nrecord','2026-08-20 19:20:01'),(2,2,2,'2013-01-01',NULL,'Initial employment \nrecord','2026-08-20 19:20:01'),(3,3,3,'2018-01-01',NULL,'Initial employment \nrecord','2026-08-20 19:20:01'),(4,4,4,'2020-01-01',NULL,'Initial employment \nrecord','2026-08-20 19:20:01'),(5,5,5,'2019-01-01',NULL,'Initial employment \nrecord','2026-08-20 19:20:01'),(6,6,6,'2016-01-01',NULL,'Initial employment \nrecord','2026-08-20 19:20:01'),(7,7,7,'2017-01-01',NULL,'Initial employment \nrecord','2026-08-20 19:20:01'),(8,8,8,'2021-01-01',NULL,'Initial employment \nrecord','2026-08-20 19:20:01'),(9,9,9,'2018-01-01',NULL,'Initial employment \nrecord','2026-08-20 19:20:01'),(10,10,10,'2016-01-01',NULL,'Initial employment \nrecord','2026-08-20 19:20:01');
/*!40000 ALTER TABLE `employment_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_requests`
--

DROP TABLE IF EXISTS `leave_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_requests` (
  `leave_request_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `leave_type_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `reason` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('Pending','Approved','Denied','Cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
  `reviewed_by` int DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`leave_request_id`),
  KEY `fk_leave_type` (`leave_type_id`),
  KEY `fk_leave_reviewer` (`reviewed_by`),
  KEY `idx_leave_employee_status` (`employee_id`,`status`),
  KEY `idx_leave_dates` (`start_date`,`end_date`),
  KEY `idx_leave_status` (`status`),
  CONSTRAINT `fk_leave_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_leave_reviewer` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_leave_type` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_types` (`leave_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_leave_request_dates` CHECK ((`end_date` >= `start_date`))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_requests`
--

LOCK TABLES `leave_requests` WRITE;
/*!40000 ALTER TABLE `leave_requests` DISABLE KEYS */;
INSERT INTO `leave_requests` VALUES (1,11,6,'2026-08-20','2026-08-21','Test','Pending',NULL,NULL,'2026-08-20 19:43:56','2026-08-20 19:43:56'),(2,13,7,'2026-08-20','2026-08-21','Test','Pending',NULL,NULL,'2026-08-20 19:47:10','2026-08-20 19:47:10'),(3,15,8,'2026-08-20','2026-08-21','Test','Pending',NULL,NULL,'2026-08-20 19:48:08','2026-08-20 19:48:08'),(4,17,9,'2026-08-20','2026-08-21','Test','Approved',2,'2026-08-21 01:59:35','2026-08-20 19:49:01','2026-08-20 23:59:35'),(5,19,2,'2026-08-27','2026-08-27','Sick Leave','Denied',2,'2026-08-21 02:00:13','2026-08-20 22:42:59','2026-08-21 00:00:13');
/*!40000 ALTER TABLE `leave_requests` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_leave_updated_at` BEFORE UPDATE ON `leave_requests` FOR EACH ROW BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_leave_status_audit` AFTER UPDATE ON `leave_requests` FOR EACH ROW BEGIN 
IF OLD.status <> NEW.status THEN 
INSERT INTO audit_log (user_id, action_type, table_name, 
record_id, old_value, new_value) 
VALUES ( 
NEW.reviewed_by, 
'STATUS_CHANGE', 
'leave_requests', 
NEW.leave_request_id, 
JSON_OBJECT('status', OLD.status), 
JSON_OBJECT('status', NEW.status) 
); 
END IF; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `leave_types`
--

DROP TABLE IF EXISTS `leave_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_types` (
  `leave_type_id` int NOT NULL AUTO_INCREMENT,
  `leave_type_name` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '1',
  `default_days_per_year` decimal(5,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`leave_type_id`),
  UNIQUE KEY `leave_type_name` (`leave_type_name`),
  CONSTRAINT `chk_leave_days` CHECK ((`default_days_per_year` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_types`
--

LOCK TABLES `leave_types` WRITE;
/*!40000 ALTER TABLE `leave_types` DISABLE KEYS */;
INSERT INTO `leave_types` VALUES (1,'Annual Leave','Annual vacation leave',1,15.00),(2,'Sick Leave','Leave due to illness',1,30.00),(3,'Family Responsibility','Family responsibility leave',1,3.00),(4,'Personal Leave','Personal time off',0,5.00),(5,'Unpaid Leave','Unpaid time away from work',0,30.00);
/*!40000 ALTER TABLE `leave_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll`
--

DROP TABLE IF EXISTS `payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll` (
  `payroll_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `pay_period_start` date NOT NULL,
  `pay_period_end` date NOT NULL,
  `base_salary` decimal(12,2) NOT NULL,
  `hours_worked` decimal(8,2) NOT NULL DEFAULT '0.00',
  `overtime_hours` decimal(8,2) NOT NULL DEFAULT '0.00',
  `overtime_pay` decimal(12,2) NOT NULL DEFAULT '0.00',
  `leave_deductions` decimal(12,2) NOT NULL DEFAULT '0.00',
  `other_deductions` decimal(12,2) NOT NULL DEFAULT '0.00',
  `paye_deduction` decimal(12,2) NOT NULL DEFAULT '0.00',
  `uif_deduction` decimal(12,2) NOT NULL DEFAULT '0.00',
  `gross_pay` decimal(12,2) NOT NULL DEFAULT '0.00',
  `net_pay` decimal(12,2) NOT NULL DEFAULT '0.00',
  `payment_status` enum('Pending','Processed','Paid','Cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
  `processed_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`payroll_id`),
  UNIQUE KEY `uq_payroll_employee_period` (`employee_id`,`pay_period_start`,`pay_period_end`),
  KEY `idx_payroll_employee_period` (`employee_id`,`pay_period_start`,`pay_period_end`),
  KEY `idx_payroll_status` (`payment_status`),
  CONSTRAINT `fk_payroll_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_payroll_amounts` CHECK (((`base_salary` >= 0) and (`overtime_pay` >= 0) and (`leave_deductions` >= 0) and (`other_deductions` >= 0) and (`gross_pay` >= 0) and (`net_pay` >= 0))),
  CONSTRAINT `chk_payroll_dates` CHECK ((`pay_period_end` >= `pay_period_start`))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll`
--

LOCK TABLES `payroll` WRITE;
/*!40000 ALTER TABLE `payroll` DISABLE KEYS */;
INSERT INTO `payroll` VALUES (1,1,'2025-07-01','2025-07-31',70000.00,160.00,0.00,0.00,500.00,0.00,10500.00,700.00,70000.00,58300.00,'Paid',NULL,'2026-08-20 19:20:11','2026-08-20 23:43:28'),(2,2,'2025-07-01','2025-07-31',80000.00,150.00,0.00,0.00,1000.00,0.00,12000.00,800.00,80000.00,66200.00,'Paid',NULL,'2026-08-20 19:20:11','2026-08-20 23:43:28'),(3,3,'2025-07-01','2025-07-31',55000.00,170.00,0.00,0.00,200.00,0.00,8250.00,550.00,55000.00,46000.00,'Paid',NULL,'2026-08-20 19:20:11','2026-08-20 23:43:28'),(4,4,'2025-07-01','2025-07-31',60000.00,165.00,0.00,0.00,300.00,0.00,9000.00,600.00,60000.00,50100.00,'Paid',NULL,'2026-08-20 19:20:11','2026-08-20 23:43:28'),(5,5,'2025-07-01','2025-07-31',58000.00,158.00,0.00,0.00,150.00,0.00,8700.00,580.00,58000.00,48570.00,'Paid',NULL,'2026-08-20 19:20:11','2026-08-20 23:43:28'),(6,6,'2025-07-01','2025-07-31',65000.00,168.00,0.00,0.00,200.00,0.00,9750.00,650.00,65000.00,54400.00,'Paid',NULL,'2026-08-20 19:20:11','2026-08-20 23:43:28'),(7,7,'2025-07-01','2025-07-31',72000.00,175.00,0.00,0.00,200.00,0.00,10800.00,720.00,72000.00,60280.00,'Paid',NULL,'2026-08-20 19:20:11','2026-08-20 23:43:28'),(8,8,'2025-07-01','2025-07-31',56000.00,160.00,0.00,0.00,0.00,0.00,8400.00,560.00,56000.00,47040.00,'Paid',NULL,'2026-08-20 19:20:11','2026-08-20 23:43:28'),(9,9,'2025-07-01','2025-07-31',62000.00,155.00,0.00,0.00,500.00,0.00,9300.00,620.00,62000.00,51580.00,'Paid',NULL,'2026-08-20 19:20:11','2026-08-20 23:43:28'),(10,10,'2025-07-01','2025-07-31',58000.00,162.00,0.00,0.00,250.00,0.00,8700.00,580.00,58000.00,48470.00,'Paid',NULL,'2026-08-20 19:20:11','2026-08-20 23:43:28'),(11,11,'2026-07-01','2026-07-28',70000.00,160.00,0.00,0.00,500.00,0.00,10500.00,700.00,70000.00,58300.00,'Pending',NULL,'2026-08-20 19:43:56','2026-08-20 23:43:28'),(12,13,'2026-04-01','2026-04-28',70000.00,160.00,0.00,0.00,500.00,0.00,10500.00,700.00,70000.00,58300.00,'Pending',NULL,'2026-08-20 19:47:10','2026-08-20 23:43:28'),(13,15,'2026-05-01','2026-05-28',70000.00,160.00,0.00,0.00,500.00,0.00,10500.00,700.00,70000.00,58300.00,'Pending',NULL,'2026-08-20 19:48:08','2026-08-20 23:43:28'),(14,17,'2026-06-01','2026-06-28',70000.00,160.00,0.00,0.00,500.00,0.00,10500.00,700.00,70000.00,58300.00,'Pending',NULL,'2026-08-20 19:49:01','2026-08-20 23:43:28');
/*!40000 ALTER TABLE `payroll` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_payroll_updated_at` BEFORE UPDATE ON `payroll` FOR EACH ROW BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `payslips`
--

DROP TABLE IF EXISTS `payslips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payslips` (
  `payslip_id` int NOT NULL AUTO_INCREMENT,
  `payroll_id` int NOT NULL,
  `payslip_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `generated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `file_path` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`payslip_id`),
  UNIQUE KEY `payroll_id` (`payroll_id`),
  UNIQUE KEY `payslip_number` (`payslip_number`),
  CONSTRAINT `fk_payslip_payroll` FOREIGN KEY (`payroll_id`) REFERENCES `payroll` (`payroll_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payslips`
--

LOCK TABLES `payslips` WRITE;
/*!40000 ALTER TABLE `payslips` DISABLE KEYS */;
INSERT INTO `payslips` VALUES (1,1,'PS-000001','2026-08-20 21:20:11',NULL),(2,2,'PS-000002','2026-08-20 21:20:11',NULL),(3,3,'PS-000003','2026-08-20 21:20:11',NULL),(4,4,'PS-000004','2026-08-20 21:20:11',NULL),(5,5,'PS-000005','2026-08-20 21:20:11',NULL),(6,6,'PS-000006','2026-08-20 21:20:11',NULL),(7,7,'PS-000007','2026-08-20 21:20:11',NULL),(8,8,'PS-000008','2026-08-20 21:20:11',NULL),(9,9,'PS-000009','2026-08-20 21:20:11',NULL),(10,10,'PS-000010','2026-08-20 21:20:11',NULL);
/*!40000 ALTER TABLE `payslips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `performance_reviews`
--

DROP TABLE IF EXISTS `performance_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `performance_reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `review_cycle_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `reviewer_id` int NOT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `strengths` text COLLATE utf8mb4_unicode_ci,
  `areas_for_improvement` text COLLATE utf8mb4_unicode_ci,
  `comments` text COLLATE utf8mb4_unicode_ci,
  `status` enum('Draft','Submitted','Completed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Draft',
  `review_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `uq_review_cycle_employee` (`review_cycle_id`,`employee_id`),
  KEY `idx_reviews_employee` (`employee_id`),
  KEY `idx_reviews_reviewer` (`reviewer_id`),
  KEY `idx_reviews_status` (`status`),
  CONSTRAINT `fk_review_cycle` FOREIGN KEY (`review_cycle_id`) REFERENCES `review_cycles` (`review_cycle_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_review_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_review_reviewer` FOREIGN KEY (`reviewer_id`) REFERENCES `employees` (`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_review_rating` CHECK (((`rating` is null) or ((`rating` >= 1) and (`rating` <= 5))))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance_reviews`
--

LOCK TABLES `performance_reviews` WRITE;
/*!40000 ALTER TABLE `performance_reviews` DISABLE KEYS */;
INSERT INTO `performance_reviews` VALUES (1,1,1,2,4.50,'Strong technical performance and teamwork.','Continue developing leadership skills.','Good overall performance.','Completed','2025-07-30','2026-08-20 19:20:10','2026-08-20 19:20:10'),(2,1,2,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(3,1,3,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(4,1,4,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(5,1,5,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(6,1,6,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(7,1,7,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(8,1,8,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(9,1,9,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(10,1,10,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(11,1,11,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(12,1,13,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(13,1,15,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(14,1,17,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38'),(15,1,19,2,NULL,NULL,NULL,'Automatically generated review','Draft','2026-08-21','2026-08-21 00:17:38','2026-08-21 00:17:38');
/*!40000 ALTER TABLE `performance_reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_performance_updated_at` BEFORE UPDATE ON `performance_reviews` FOR EACH ROW BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`permission_id`),
  UNIQUE KEY `permission_name` (`permission_name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'employees.read','View employees'),(2,'employees.write','Create and update employees'),(3,'attendance.read','View attendance'),(4,'attendance.write','Create and update attendance'),(5,'leave.read','View leave requests'),(6,'leave.write','Submit and update leave requests'),(7,'leave.approve','Approve or deny leave requests'),(8,'payroll.read','View payroll'),(9,'payroll.write','Create and process payroll'),(10,'reviews.read','View performance reviews'),(11,'reviews.write','Create and update performance reviews'),(12,'settings.manage','Manage system settings');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `positions` (
  `position_id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `position_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`position_id`),
  UNIQUE KEY `uq_position_department` (`department_id`,`position_title`),
  KEY `idx_positions_department` (`department_id`),
  CONSTRAINT `fk_positions_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES (1,1,'Software Engineer','Develops and maintains software','2026-08-20 19:20:01'),(2,2,'HR Manager','Manages HR operations','2026-08-20 19:20:01'),(3,3,'Quality Analyst','Tests software and processes','2026-08-20 19:20:01'),(4,4,'Sales Representative','Handles sales activities','2026-08-20 19:20:01'),(5,5,'Marketing Specialist','Manages marketing activities','2026-08-20 19:20:01'),(6,6,'UI/UX Designer','Designs user interfaces and experiences','2026-08-20 19:20:01'),(7,7,'DevOps Engineer','Manages infrastructure and deployments','2026-08-20 19:20:01'),(8,5,'Content Strategist','Plans content strategy','2026-08-20 19:20:01'),(9,8,'Accountant','Manages financial records','2026-08-20 19:20:01'),(10,9,'Customer Support Lead','Leads customer support','2026-08-20 19:20:01'),(11,10,'TestRole1787255036110','Smoke test role','2026-08-20 19:43:56'),(12,11,'TestRole1787255229819','Smoke test role','2026-08-20 19:47:10'),(13,12,'TestRole1787255287364','Smoke test role','2026-08-20 19:48:08'),(14,13,'TestRole1787255340717','Smoke test role','2026-08-20 19:49:01');
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_cycles`
--

DROP TABLE IF EXISTS `review_cycles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_cycles` (
  `review_cycle_id` int NOT NULL AUTO_INCREMENT,
  `cycle_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cycle_type` enum('Quarterly','Annual','Probation','Custom') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Quarterly',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('Draft','Active','Closed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Draft',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_cycle_id`),
  UNIQUE KEY `cycle_name` (`cycle_name`),
  KEY `idx_review_cycles_status_dates` (`status`,`start_date`,`end_date`),
  CONSTRAINT `chk_review_cycle_dates` CHECK ((`end_date` >= `start_date`))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_cycles`
--

LOCK TABLES `review_cycles` WRITE;
/*!40000 ALTER TABLE `review_cycles` DISABLE KEYS */;
INSERT INTO `review_cycles` VALUES (1,'2025 Annual Performance Review','Annual','2025-01-01','2025-12-31','Active','2026-08-20 19:20:04');
/*!40000 ALTER TABLE `review_cycles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `fk_role_permissions_permission` (`permission_id`),
  CONSTRAINT `fk_role_permissions_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_role_permissions_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (1,1),(2,1),(3,1),(4,1),(1,2),(2,2),(1,3),(2,3),(3,3),(4,3),(1,4),(2,4),(4,4),(1,5),(2,5),(3,5),(4,5),(1,6),(2,6),(3,6),(1,7),(2,7),(4,7),(1,8),(2,8),(3,8),(1,9),(1,10),(2,10),(3,10),(4,10),(1,11),(2,11),(3,11),(4,11),(1,12),(2,12);
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','Full HR system administration'),(2,'HR Manager','HR and employee management access'),(3,'Employee','Standard employee access'),(4,'Manager','Manager and team review access');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shifts`
--

DROP TABLE IF EXISTS `shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shifts` (
  `shift_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `shift_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `location` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('Scheduled','Completed','Cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Scheduled',
  `notes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`shift_id`),
  KEY `idx_shifts_employee_date` (`employee_id`,`shift_date`),
  KEY `idx_shifts_date_status` (`shift_date`,`status`),
  CONSTRAINT `fk_shift_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_shift_times` CHECK ((`end_time` > `start_time`))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shifts`
--

LOCK TABLES `shifts` WRITE;
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
INSERT INTO `shifts` VALUES (1,1,'2025-07-30','08:00:00','17:00:00','Main Office','Scheduled',NULL,'2026-08-20 19:20:04','2026-08-20 19:20:04'),(2,2,'2025-07-30','08:00:00','17:00:00','Main Office','Scheduled',NULL,'2026-08-20 19:20:04','2026-08-20 19:20:04'),(3,3,'2025-07-30','08:00:00','17:00:00','Main Office','Scheduled',NULL,'2026-08-20 19:20:04','2026-08-20 19:20:04');
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_shifts_updated_at` BEFORE UPDATE ON `shifts` FOR EACH ROW BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `time_entries`
--

DROP TABLE IF EXISTS `time_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_entries` (
  `time_entry_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `project_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `task_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `duration_minutes` int DEFAULT NULL,
  `status` enum('Running','Completed','Cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Running',
  `notes` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`time_entry_id`),
  KEY `idx_time_entries_employee_status` (`employee_id`,`status`),
  KEY `idx_time_entries_project` (`project_name`),
  CONSTRAINT `fk_time_entry_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_time_entry_duration` CHECK (((`duration_minutes` is null) or (`duration_minutes` >= 0))),
  CONSTRAINT `chk_time_entry_times` CHECK (((`end_time` is null) or (`end_time` >= `start_time`)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_entries`
--

LOCK TABLES `time_entries` WRITE;
/*!40000 ALTER TABLE `time_entries` DISABLE KEYS */;
/*!40000 ALTER TABLE `time_entries` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_time_entries_updated_at` BEFORE UPDATE ON `time_entries` FOR EACH ROW BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `timesheets`
--

DROP TABLE IF EXISTS `timesheets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timesheets` (
  `timesheet_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `work_date` date NOT NULL,
  `hours_worked` decimal(5,2) NOT NULL DEFAULT '0.00',
  `overtime_hours` decimal(5,2) NOT NULL DEFAULT '0.00',
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('Draft','Submitted','Approved','Rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Draft',
  `approved_by` int DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`timesheet_id`),
  UNIQUE KEY `uq_timesheet_employee_date` (`employee_id`,`work_date`),
  KEY `fk_timesheet_approver` (`approved_by`),
  KEY `idx_timesheet_employee_date` (`employee_id`,`work_date`),
  KEY `idx_timesheet_status` (`status`),
  CONSTRAINT `fk_timesheet_approver` FOREIGN KEY (`approved_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_timesheet_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_timesheet_hours` CHECK (((`hours_worked` >= 0) and (`hours_worked` <= 24))),
  CONSTRAINT `chk_timesheet_overtime` CHECK (((`overtime_hours` >= 0) and (`overtime_hours` <= 24)))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timesheets`
--

LOCK TABLES `timesheets` WRITE;
/*!40000 ALTER TABLE `timesheets` DISABLE KEYS */;
INSERT INTO `timesheets` VALUES (1,1,'2025-07-25',8.00,0.00,'Normal working day','Approved',NULL,NULL,'2026-08-20 19:20:03','2026-08-20 19:20:03'),(2,2,'2025-07-25',8.00,0.00,'Normal working day','Approved',NULL,NULL,'2026-08-20 19:20:03','2026-08-20 19:20:03'),(3,3,'2025-07-25',8.00,0.00,'Normal working day','Approved',NULL,NULL,'2026-08-20 19:20:03','2026-08-20 19:20:03'),(4,1,'2025-07-26',8.00,0.00,'Normal working day','Approved',NULL,NULL,'2026-08-20 19:20:03','2026-08-20 19:20:03'),(5,2,'2025-07-26',8.00,0.00,'Normal working day','Approved',NULL,NULL,'2026-08-20 19:20:03','2026-08-20 19:20:03'),(6,3,'2025-07-26',8.00,0.00,'Normal working day','Approved',NULL,NULL,'2026-08-20 19:20:03','2026-08-20 19:20:03');
/*!40000 ALTER TABLE `timesheets` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_timesheets_updated_at` BEFORE UPDATE ON `timesheets` FOR EACH ROW BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `role_id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_role` (`role_id`),
  KEY `idx_users_active` (`is_active`),
  CONSTRAINT `fk_users_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,8,3,'farai.gumbo@moderntech.com','$2b$12$pHz/pmPmx/eMuQjym34xbutKbJKZObfnuKupopdBHKgfVeyM9hvG.',1,NULL,'2026-08-20 19:20:02','2026-08-20 22:50:52'),(2,10,3,'fatima.patel@moderntech.com','$2b$12$pHz/pmPmx/eMuQjym34xbutKbJKZObfnuKupopdBHKgfVeyM9hvG.',1,NULL,'2026-08-20 19:20:02','2026-08-20 22:50:52'),(3,9,3,'karabo.dlamini@moderntech.com','$2b$12$pHz/pmPmx/eMuQjym34xbutKbJKZObfnuKupopdBHKgfVeyM9hvG.',1,NULL,'2026-08-20 19:20:02','2026-08-20 22:50:52'),(4,4,3,'keshav.naidoo@moderntech.com','$2b$12$pHz/pmPmx/eMuQjym34xbutKbJKZObfnuKupopdBHKgfVeyM9hvG.',1,NULL,'2026-08-20 19:20:02','2026-08-20 22:50:52'),(5,2,2,'lungile.moyo@moderntech.com','$2b$12$pHz/pmPmx/eMuQjym34xbutKbJKZObfnuKupopdBHKgfVeyM9hvG.',1,NULL,'2026-08-20 19:20:02','2026-08-20 22:50:52'),(6,7,3,'naledi.moeketsi@moderntech.com','$2b$12$pHz/pmPmx/eMuQjym34xbutKbJKZObfnuKupopdBHKgfVeyM9hvG.',1,NULL,'2026-08-20 19:20:02','2026-08-20 22:50:52'),(7,1,3,'sibongile.nkosi@moderntech.com','$2b$12$pHz/pmPmx/eMuQjym34xbutKbJKZObfnuKupopdBHKgfVeyM9hvG.',1,NULL,'2026-08-20 19:20:02','2026-08-20 22:50:52'),(8,6,3,'sipho.zulu@moderntech.com','$2b$12$pHz/pmPmx/eMuQjym34xbutKbJKZObfnuKupopdBHKgfVeyM9hvG.',1,NULL,'2026-08-20 19:20:02','2026-08-20 22:50:52'),(9,3,3,'thabo.molefe@moderntech.com','$2b$12$pHz/pmPmx/eMuQjym34xbutKbJKZObfnuKupopdBHKgfVeyM9hvG.',1,NULL,'2026-08-20 19:20:02','2026-08-20 22:50:52'),(10,5,3,'zanele.khumalo@moderntech.com','$2b$12$pHz/pmPmx/eMuQjym34xbutKbJKZObfnuKupopdBHKgfVeyM9hvG.',1,NULL,'2026-08-20 19:20:02','2026-08-20 22:50:52'),(16,11,3,'test1787255036110@moderntech.com','$2b$12$leTAilb54Cf/kASmlXI1Z.Y0e2I/ZSSK320LB1n70eqndrKG3UlfG',1,NULL,'2026-08-20 19:43:58','2026-08-20 22:48:03'),(17,13,3,'test1787255229819@moderntech.com','$2b$12$leTAilb54Cf/kASmlXI1Z.Y0e2I/ZSSK320LB1n70eqndrKG3UlfG',1,NULL,'2026-08-20 19:47:11','2026-08-20 22:48:04'),(18,15,3,'test1787255287364@moderntech.com','$2b$12$leTAilb54Cf/kASmlXI1Z.Y0e2I/ZSSK320LB1n70eqndrKG3UlfG',1,NULL,'2026-08-20 19:48:09','2026-08-20 22:48:04'),(19,17,3,'test1787255340717@moderntech.com','$2b$12$leTAilb54Cf/kASmlXI1Z.Y0e2I/ZSSK320LB1n70eqndrKG3UlfG',1,NULL,'2026-08-20 19:49:02','2026-08-20 22:48:05'),(20,19,3,'totose.ahlumile@moderntech.com','$2b$12$pHz/pmPmx/eMuQjym34xbutKbJKZObfnuKupopdBHKgfVeyM9hvG.',1,NULL,'2026-08-20 22:48:05','2026-08-20 22:50:52');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_users_updated_at` BEFORE UPDATE ON `users` FOR EACH ROW BEGIN 
SET NEW.updated_at = CURRENT_TIMESTAMP; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `vw_attendance_summary`
--

DROP TABLE IF EXISTS `vw_attendance_summary`;
/*!50001 DROP VIEW IF EXISTS `vw_attendance_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_attendance_summary` AS SELECT 
 1 AS `employee_id`,
 1 AS `employee_number`,
 1 AS `employee_name`,
 1 AS `total_records`,
 1 AS `present_days`,
 1 AS `absent_days`,
 1 AS `late_days`,
 1 AS `remote_days`,
 1 AS `leave_days`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_employee_directory`
--

DROP TABLE IF EXISTS `vw_employee_directory`;
/*!50001 DROP VIEW IF EXISTS `vw_employee_directory`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_employee_directory` AS SELECT 
 1 AS `employee_id`,
 1 AS `employee_number`,
 1 AS `employee_name`,
 1 AS `email`,
 1 AS `phone`,
 1 AS `position_title`,
 1 AS `department_name`,
 1 AS `salary`,
 1 AS `employment_status`,
 1 AS `hire_date`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_payroll_summary`
--

DROP TABLE IF EXISTS `vw_payroll_summary`;
/*!50001 DROP VIEW IF EXISTS `vw_payroll_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_payroll_summary` AS SELECT 
 1 AS `payroll_id`,
 1 AS `employee_number`,
 1 AS `employee_name`,
 1 AS `department_name`,
 1 AS `pay_period_start`,
 1 AS `pay_period_end`,
 1 AS `base_salary`,
 1 AS `gross_pay`,
 1 AS `leave_deductions`,
 1 AS `other_deductions`,
 1 AS `net_pay`,
 1 AS `payment_status`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'moderntech_hr'
--

--
-- Dumping routines for database 'moderntech_hr'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_approve_leave_request` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_approve_leave_request`( 
IN p_leave_request_id INT, 
IN p_reviewer_user_id INT, 
IN p_new_status VARCHAR(20) 
)
BEGIN 
DECLARE v_request_exists INT DEFAULT 0; 
DECLARE v_old_status VARCHAR(20); 
START TRANSACTION; 
SELECT COUNT(*), MAX(status) 
INTO v_request_exists, v_old_status 
FROM leave_requests 
WHERE leave_request_id = p_leave_request_id; 
IF v_request_exists = 0 THEN 
ROLLBACK; 
SIGNAL SQLSTATE '45000' 
SET MESSAGE_TEXT = 'Leave request not found'; 
ELSEIF p_new_status NOT IN ('Approved','Denied','Cancelled') THEN 
ROLLBACK; 
SIGNAL SQLSTATE '45000' 
SET MESSAGE_TEXT = 'Invalid leave status'; 
ELSE 
UPDATE leave_requests 
SET status = p_new_status, 
reviewed_by = p_reviewer_user_id, 
reviewed_at = CURRENT_TIMESTAMP 
WHERE leave_request_id = p_leave_request_id; 
COMMIT; 
SELECT p_leave_request_id AS leave_request_id, 
v_old_status AS old_status, 
p_new_status AS new_status; 
END IF; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_employee_dashboard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_employee_dashboard`(IN p_employee_id INT)
BEGIN 
SELECT 
e.employee_id, 
e.employee_number, 
CONCAT(e.first_name, ' ', e.last_name) AS employee_name, 
p.position_title, 
d.department_name, 
e.salary, 
e.employment_status, 
( 
SELECT COUNT(*) 
FROM attendance a 
WHERE a.employee_id = e.employee_id 
AND a.status = 'Present' 
) AS present_days, 
( 
SELECT COUNT(*) 
FROM leave_requests lr 
WHERE lr.employee_id = e.employee_id 
AND lr.status = 'Pending' 
) AS pending_leave_requests, 
( SELECT COALESCE(SUM(t.hours_worked), 0) 
FROM timesheets t 
WHERE t.employee_id = e.employee_id 
) AS total_hours 
FROM employees e 
JOIN positions p ON p.position_id = e.position_id 
JOIN departments d ON d.department_id = p.department_id 
WHERE e.employee_id = p_employee_id; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_payroll_summary` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_payroll_summary`( 
IN p_start_date DATE, 
IN p_end_date DATE 
)
BEGIN 
SELECT 
e.employee_id, 
e.employee_number,
CONCAT(e.first_name, ' ', e.last_name) AS employee_name, 
d.department_name, 
SUM(pr.gross_pay) AS gross_pay, 
SUM(pr.leave_deductions) AS leave_deductions, 
SUM(pr.other_deductions) AS other_deductions, 
SUM(pr.net_pay) AS net_pay 
FROM payroll pr 
JOIN employees e ON e.employee_id = pr.employee_id 
JOIN positions pos ON pos.position_id = e.position_id 
JOIN departments d ON d.department_id = pos.department_id 
WHERE pr.pay_period_start >= p_start_date 
AND pr.pay_period_end <= p_end_date 
GROUP BY e.employee_id, e.employee_number, 
e.first_name, e.last_name, d.department_name 
ORDER BY e.last_name, e.first_name; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_submit_leave_request` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_submit_leave_request`(
IN p_employee_id INT, 
IN p_leave_type_id INT, 
IN p_start_date DATE, 
IN p_end_date DATE, 
IN p_reason VARCHAR(500) 
)
BEGIN 
DECLARE v_employee_exists INT DEFAULT 0; 
DECLARE v_leave_type_exists INT DEFAULT 0; 
START TRANSACTION; 
SELECT COUNT(*) INTO v_employee_exists 
FROM employees 
WHERE employee_id = p_employee_id 
AND employment_status = 'Active'; 
SELECT COUNT(*) INTO v_leave_type_exists 
FROM leave_types 
WHERE leave_type_id = p_leave_type_id; 
IF v_employee_exists = 0 THEN 
ROLLBACK; 
SIGNAL SQLSTATE '45000' 
SET MESSAGE_TEXT = 'Employee does not exist or is inactive'; 
ELSEIF v_leave_type_exists = 0 THEN 
ROLLBACK; 
SIGNAL SQLSTATE '45000' 
SET MESSAGE_TEXT = 'Invalid leave type'; 
ELSEIF p_end_date < p_start_date THEN 
ROLLBACK; 
SIGNAL SQLSTATE '45000' 
SET MESSAGE_TEXT = 'End date cannot be before start date'; 
ELSE 
INSERT INTO leave_requests 
(employee_id, leave_type_id, start_date, end_date, reason, 
status) 
VALUES 
(p_employee_id, p_leave_type_id, p_start_date, p_end_date, 
p_reason, 'Pending'); 
COMMIT; 
SELECT LAST_INSERT_ID() AS leave_request_id; 
END IF; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vw_attendance_summary`
--

/*!50001 DROP VIEW IF EXISTS `vw_attendance_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_attendance_summary` AS select `e`.`employee_id` AS `employee_id`,`e`.`employee_number` AS `employee_number`,concat(`e`.`first_name`,' ',`e`.`last_name`) AS `employee_name`,count(`a`.`attendance_id`) AS `total_records`,sum((`a`.`status` = 'Present')) AS `present_days`,sum((`a`.`status` = 'Absent')) AS `absent_days`,sum((`a`.`status` = 'Late')) AS `late_days`,sum((`a`.`status` = 'Remote')) AS `remote_days`,sum((`a`.`status` = 'On Leave')) AS `leave_days` from (`employees` `e` left join `attendance` `a` on((`a`.`employee_id` = `e`.`employee_id`))) group by `e`.`employee_id`,`e`.`employee_number`,`e`.`first_name`,`e`.`last_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_employee_directory`
--

/*!50001 DROP VIEW IF EXISTS `vw_employee_directory`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_employee_directory` AS select `e`.`employee_id` AS `employee_id`,`e`.`employee_number` AS `employee_number`,concat(`e`.`first_name`,' ',`e`.`last_name`) AS `employee_name`,`e`.`email` AS `email`,`e`.`phone` AS `phone`,`p`.`position_title` AS `position_title`,`d`.`department_name` AS `department_name`,`e`.`salary` AS `salary`,`e`.`employment_status` AS `employment_status`,`e`.`hire_date` AS `hire_date` from ((`employees` `e` join `positions` `p` on((`p`.`position_id` = `e`.`position_id`))) join `departments` `d` on((`d`.`department_id` = `p`.`department_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_payroll_summary`
--

/*!50001 DROP VIEW IF EXISTS `vw_payroll_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_payroll_summary` AS select `pr`.`payroll_id` AS `payroll_id`,`e`.`employee_number` AS `employee_number`,concat(`e`.`first_name`,' ',`e`.`last_name`) AS `employee_name`,`d`.`department_name` AS `department_name`,`pr`.`pay_period_start` AS `pay_period_start`,`pr`.`pay_period_end` AS `pay_period_end`,`pr`.`base_salary` AS `base_salary`,`pr`.`gross_pay` AS `gross_pay`,`pr`.`leave_deductions` AS `leave_deductions`,`pr`.`other_deductions` AS `other_deductions`,`pr`.`net_pay` AS `net_pay`,`pr`.`payment_status` AS `payment_status` from (((`payroll` `pr` join `employees` `e` on((`e`.`employee_id` = `pr`.`employee_id`))) join `positions` `p` on((`p`.`position_id` = `e`.`position_id`))) join `departments` `d` on((`d`.`department_id` = `p`.`department_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-21  6:32:36
