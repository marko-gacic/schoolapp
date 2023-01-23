-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: project1
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `examperiod`
--

DROP TABLE IF EXISTS `examperiod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examperiod` (
  `id` int NOT NULL AUTO_INCREMENT,
  `periodName` varchar(45) NOT NULL,
  `end` date DEFAULT NULL,
  `start` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `periodName_UNIQUE` (`periodName`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `end_UNIQUE` (`end`),
  UNIQUE KEY `start_UNIQUE` (`start`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examperiod`
--

LOCK TABLES `examperiod` WRITE;
/*!40000 ALTER TABLE `examperiod` DISABLE KEYS */;
INSERT INTO `examperiod` VALUES (14,'Marko222','2023-01-12','2023-01-11','0'),(15,'Marko222dfs','2023-02-15','2023-02-06','0'),(16,'asdasd','2023-02-10','2023-02-08','0'),(17,'Srpski','2022-12-23','2022-12-22','0'),(18,'Danas','2022-12-29','2022-12-28','0'),(19,'Test2','2022-12-14','2022-12-12','0'),(20,'Test222','2022-12-16','2022-12-15','0'),(22,'Stojan','2022-12-26','2022-12-25','0'),(24,'admin@gmail.com','2022-12-30','2022-12-29','0');
/*!40000 ALTER TABLE `examperiod` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-23 15:18:15
