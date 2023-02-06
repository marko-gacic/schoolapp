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
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `indexNumber` int NOT NULL,
  `indexYear` int NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `currentYearOfStudy` int NOT NULL,
  `city` int unsigned DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `indexNumber_UNIQUE` (`indexNumber`),
  UNIQUE KEY `idstudent_UNIQUE` (`id`),
  UNIQUE KEY `indexYear_UNIQUE` (`indexYear`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_student_city1_idx` (`city`),
  KEY `fk_student_role1_idx` (`role_id`),
  CONSTRAINT `fk_student_city1` FOREIGN KEY (`city`) REFERENCES `city` (`zip_code`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (3,123,123,'Jovana','Babic','babic.jovana@gmail.com','Ljubicka',2,11000,0),(4,111,121,'Jelena','Babic','jelena.b@gmail.com','Ljubicka',3,34303,0),(5,133,133,'Dejan','Radulov','deki.r@gmail.com','none',1,11000,0),(6,22,122,'Nikola','Petrovic','nik@gmail.com','none',3,11000,0),(7,213,2131,'Marko','Gacic','poslovnogacic@gmail.com','none',121,21000,0),(15,2224,2001,'Marko','Gacic','poslovnogaci111@gmail.com','None',2,25260,0),(17,5623,2003,'Dejan','Radulov','deki11@gmail.com','beograd',1,11000,NULL),(18,5622,2006,'Petar','Stanisic','petar.s@gmail.com','None',3,11000,NULL),(20,1233,2004,'Test','Test','test123@gmail.com','asdasd',1,25260,NULL);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-06 16:09:14
