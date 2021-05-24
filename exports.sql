-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: phong_tro
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `facebook_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `admin_update_user_status`
--

DROP TABLE IF EXISTS `admin_update_user_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_update_user_status` (
  `id_admin` int unsigned DEFAULT NULL,
  `id_user` int unsigned DEFAULT NULL,
  `action_time` timestamp NOT NULL,
  KEY `id_admin` (`id_admin`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `admin_update_user_status_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`),
  CONSTRAINT `admin_update_user_status_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `day_created` timestamp NOT NULL,
  `day_come` timestamp NOT NULL,
  `day_out` timestamp NOT NULL,
  `id_room` int unsigned DEFAULT NULL,
  `id_user` int unsigned DEFAULT NULL,
  `deposit` float NOT NULL,
  KEY `id_room` (`id_room`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `room` (`id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id_comment` int unsigned NOT NULL AUTO_INCREMENT,
  `id_room` int unsigned DEFAULT NULL,
  `id_user` int unsigned DEFAULT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_comment`),
  KEY `id_room` (`id_room`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `room` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `current_user_in_room`
--

DROP TABLE IF EXISTS `current_user_in_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `current_user_in_room` (
  `id_room` int unsigned DEFAULT NULL,
  `id_user` int unsigned DEFAULT NULL,
  `status` tinyint DEFAULT '1',
  KEY `id_room` (`id_room`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `current_user_in_room_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `room` (`id`),
  CONSTRAINT `current_user_in_room_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `facilities`
--

DROP TABLE IF EXISTS `facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facilities` (
  `id` int unsigned NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `facilities_in_room`
--

DROP TABLE IF EXISTS `facilities_in_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facilities_in_room` (
  `id_room` int unsigned DEFAULT NULL,
  `id_facility` int unsigned DEFAULT NULL,
  KEY `id_room` (`id_room`),
  KEY `id_facility` (`id_facility`),
  CONSTRAINT `facilities_in_room_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `room` (`id`),
  CONSTRAINT `facilities_in_room_ibfk_2` FOREIGN KEY (`id_facility`) REFERENCES `facilities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lease_update_user_history`
--

DROP TABLE IF EXISTS `lease_update_user_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lease_update_user_history` (
  `id_lease` int unsigned DEFAULT NULL,
  `id_user` int unsigned DEFAULT NULL,
  `time` timestamp NOT NULL,
  KEY `id_lease` (`id_lease`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `lease_update_user_history_ibfk_1` FOREIGN KEY (`id_lease`) REFERENCES `user_account` (`id`),
  CONSTRAINT `lease_update_user_history_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id_room` int unsigned DEFAULT NULL,
  `id_user` int unsigned DEFAULT NULL,
  `point` float DEFAULT NULL,
  KEY `id_room` (`id_room`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `room` (`id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `capacity` int DEFAULT NULL,
  `acreage` int DEFAULT NULL,
  `overview` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` float NOT NULL,
  `rent_or_sale` tinyint DEFAULT '0',
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `city` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `district` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `house_number` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `region` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isShow` tinyint(1) DEFAULT '1',
  `room_type` int unsigned DEFAULT '0',
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `name_router` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name-router_UNIQUE` (`name_router`),
  KEY `room_type` (`room_type`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`room_type`) REFERENCES `room_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_images`
--

DROP TABLE IF EXISTS `room_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_images` (
  `id_room` int unsigned DEFAULT NULL,
  `link` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_image` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `id_image_UNIQUE` (`id_image`),
  KEY `id_room` (`id_room`),
  CONSTRAINT `room_images_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_types`
--

DROP TABLE IF EXISTS `room_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_account` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_account_status` tinyint DEFAULT '1',
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `user_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `permission` tinyint DEFAULT '-1',
  `hash_password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11313132 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `id_profile` int unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int unsigned DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_profile`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user_account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_promotion_request`
--

DROP TABLE IF EXISTS `user_promotion_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_promotion_request` (
  `id_admin` int unsigned DEFAULT NULL,
  `id_user` int unsigned DEFAULT NULL,
  `action_time` timestamp NOT NULL,
  `promotion_status` tinyint DEFAULT '-1',
  KEY `id_admin` (`id_admin`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `user_promotion_request_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`),
  CONSTRAINT `user_promotion_request_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-24 22:36:23
