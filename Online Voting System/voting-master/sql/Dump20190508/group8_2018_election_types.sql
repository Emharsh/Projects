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
-- Dumping data for table `election_types`
--

LOCK TABLES `election_types` WRITE;
/*!40000 ALTER TABLE `election_types` DISABLE KEYS */;
INSERT INTO `election_types` VALUES (1,'General Election',1,'https://www.yourvotematters.co.uk/how-am-i-re','Constituency','Constituencies','Member of Parliament','Member of Parliament','MP','Vote for only one candidate by putting a cross in the box of your choice.','Election of the ','for the ',NULL,NULL),(2,'Local government',1,'https://www.yourvotematters.co.uk/how-am-i-re','Ward','Wards','Councillor','Councillor','Cllr','Vote for only one candidate by putting a cross in the box of your choice.','Election of the ','for the ',NULL,NULL),(3,'European Parliament Great Britan',3,'https://www.yourvotematters.co.uk/how-am-i-re','Region','Regions','Member of the European Parliament','Member of the European Parliament','MEP',NULL,NULL,NULL,NULL,NULL),(4,'European Parliament Northen Ireland',2,'','Region','Regions','Member of the European Parliament','Member of the European Parliament','MEP','Vote for only one candidate by putting a cross in the box of your choice.','Election of the ','for the ',NULL,NULL),(5,'Scottish Parliament Constituency Election',1,'https://www.yourvotematters.co.uk/how-am-i-re','Constituency','Constituencies','Member of the Scottish Parliament','Member of the Scottish Parliament','MSP',NULL,NULL,NULL,NULL,NULL),(6,'Scottish Parliament Regional Election',3,'','Region','Regions','Member of the Scottish Parliament','Member of the Scottish Parliament','MSP',NULL,NULL,NULL,NULL,NULL),(7,'Northern Ireland Assembly',2,'https://www.yourvotematters.co.uk/how-am-i-re','Constituency','Constituencies','Member of the Legislative Assembly','Member of the Legislative Assembly','MLA',NULL,NULL,NULL,NULL,NULL),(8,'National Assembly for Wales Constituency Elec',1,'https://www.yourvotematters.co.uk/how-am-i-re','Constituency','Constituencies','Assembly Member','Assembly Member','AM','Vote for only one candidate by putting a cross in the box of your choice.','Election of the ','for the ',NULL,NULL),(9,'National Assembly for Wales Regional Election',3,'https://www.yourvotematters.co.uk/how-am-i-re','Region','Regions','Assembly Member','Assembly Member','AM',NULL,NULL,NULL,NULL,NULL),(10,'Local mayors',1,'','City','Cities','Mayor','Mayor','Mayor','Vote for only one candidate by putting a cross in the box of your choice.','Election of the ','for the ',NULL,NULL),(11,'Mayor of London',1,'https://www.yourvotematters.co.uk/how-am-i-re','City','Cities','Mayor','Mayor','Mayor','Vote for only one candidate by putting a cross in the box of your choice.','Election of the ','for the ',NULL,NULL),(12,'London Assembly',1,'https://www.yourvotematters.co.uk/how-am-i-re','Borough','Boroughs','Assembly Member','Assembly Member','AM','Vote for only one candidate by putting a cross in the box of your choice.','Election of the ','for the ',NULL,NULL),(13,'Police and Crime Commissioner',1,'https://www.yourvotematters.co.uk/how-am-i-re','Constabulary','Constabularies','Police and Crime Commissioner','Police and Crime Commissioner','PCC','Vote for only one candidate by putting a cross in the box of your choice.','Election of the ','for the ',NULL,NULL),(14,'Referendums',1,'','Area','Areas','Referendum','Referendum','Referendum',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `election_types` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-08 22:33:58
