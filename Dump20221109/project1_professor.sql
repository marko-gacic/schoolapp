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
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `relocationDate` date NOT NULL,
  `city` int unsigned DEFAULT NULL,
  `title` int unsigned DEFAULT NULL,
  `role_id` int NOT NULL,
  `subject_id` int NOT NULL,
  `exam_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idprofessor_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_professor_city1_idx` (`city`),
  KEY `fk_professor_titles1_idx` (`title`),
  KEY `fk_professor_role1_idx` (`role_id`),
  KEY `fk_professor_subject1_idx` (`subject_id`),
  KEY `fk_professor_exam1_idx` (`exam_id`),
  CONSTRAINT `fk_professor_city1` FOREIGN KEY (`city`) REFERENCES `city` (`zip_code`),
  CONSTRAINT `fk_professor_exam1` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`),
  CONSTRAINT `fk_professor_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_professor_subject1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
  CONSTRAINT `fk_professor_titles1` FOREIGN KEY (`title`) REFERENCES `title` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES (1,'Marko','Gacic','poslovnogacic@gmail.com','Mileve Maric',123456,'1992-05-12',21000,1,0,0,0),(2,'Nikola','Petrovic','nik.petrovic@gmail.com','NN',222222,'1992-01-25',11000,2,0,0,0),(3,'Jovana ','Babic','babic.j@gmail.com','NN',333333,'1995-04-20',11000,2,0,0,0),(4,'Stojan','Vujosevic','stojke@gmail.com','NN',44444,'2000-05-22',21000,3,0,0,0),(5,'Dejan ','Radulov','deki@gmail.com','NN',55555,'2000-04-21',21000,4,0,0,0),(6,'Marko','Babic','jelenab@gmail.com','NN',6666,'2021-02-02',11000,5,0,0,0),(7,'Marko','Gacic','poslovnogacic91@gmail.com','none',33333,'1998-12-30',18220,6,0,0,0),(8,'Biljana','Stanic','stanic.b@gmail.com','asdasd',1111123,'1992-01-20',25260,2,0,0,0),(11,'Stojan','Vujosevic','stojke111@gmail.com','test',21312312,'2022-10-30',11000,2,0,0,0),(13,'Marko','Gacic','test1111@gmail.com','None',213123123,'1992-02-01',18220,2,0,0,0),(14,'Marko','Gacic','poslovnogacic333@gmail.com','Nnone',222234567,'1992-02-01',18220,2,0,0,0);
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-20 15:59:58
