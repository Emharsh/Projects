-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 10.1.10.2    Database: group8_2018
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `voting_tokens`
--

LOCK TABLES `voting_tokens` WRITE;
/*!40000 ALTER TABLE `voting_tokens` DISABLE KEYS */;
INSERT INTO `voting_tokens` VALUES (1,5,'99ae99f4-8dfe-4743-b3ab-4fc7ef1b06ec','2019-04-11 12:48:22','{\"secret\": \"b944f080749f658f65c68ae34913258104591ece10f4cfe7faacf6b6b38b848a\"}'),(2,7,'4ce43b40-7499-4c0e-9270-e497dd35d745','2019-05-08 22:45:15','{\"secret\": \"52939391ca0e8d673469664429448f3785b6dfb55f826cae8cba9bc3c8682a8e\", \"electoralRegionsNames\": [\"Cardiff Council\", \"Wales\", \"Plasnewydd\", \"Cardiff 030\", \"Roath Community\", \"Cardiff Central\", \"Cardiff 030D\", \"South Wales Central\", \"Cardiff and Vale University Health Board\", \"House of Commons\", \"European Parliament\", \"National Assembly for Wales\"]}'),(3,9,'2301190d-19ab-43fb-b90d-06c86faab132','2019-04-27 21:56:39','{\"secret\": \"d035f1e55c8a1b25f393415f76a0256a0a7e95a0ddbca6718caf7a611336ee2a\"}');
/*!40000 ALTER TABLE `voting_tokens` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-08 22:33:59
