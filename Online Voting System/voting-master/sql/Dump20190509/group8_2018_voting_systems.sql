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
-- Dumping data for table `voting_systems`
--

LOCK TABLES `voting_systems` WRITE;
/*!40000 ALTER TABLE `voting_systems` DISABLE KEYS */;
INSERT INTO `voting_systems` VALUES (1,'a','a',NULL,NULL,NULL,_binary '  document.getElementById(\'submitBallotBtn\').addEventListener(\'click\', function() {\n    var selected = document.querySelector(\'input[name=choice]:checked\');\n    var ballotSummary = \'Protest my vote.\';\n    var candidateId = null;\n    if (selected && selected.value) {\n      var candidateEntry = selected.parentNode.parentNode.parentNode;\n      var candidateName = candidateEntry.getElementsByClassName(\'candidate-name\')[0].innerText;\n      var candidateParty = candidateEntry.getElementsByClassName(\'candidate-party\')[0].innerText;\n      ballotSummary = candidateName + \', Party: \' + candidateParty;\n      candidateId = parseInt(selected.value);\n    }\n\n    document.getElementById(\'ballotSummary\').innerText = ballotSummary;\n    var ballot = {chosenElectionCandidateId: candidateId};\n    submitBallot(ballot);\n  })',NULL,NULL,NULL,NULL),(2,'b','b',NULL,NULL,NULL,_binary '  document.getElementById(\'submitBallotBtn\').addEventListener(\'click\', function() {\n    var selected = document.querySelector(\'input[name=choice]:checked\');\n    var ballotSummary = \'Protest my vote.\';\n    var candidateId = null;\n    if (selected && selected.value) {\n      var candidateEntry = selected.parentNode.parentNode.parentNode;\n      var candidateName = candidateEntry.getElementsByClassName(\'candidate-name\')[0].innerText;\n      var candidateParty = candidateEntry.getElementsByClassName(\'candidate-party\')[0].innerText;\n      ballotSummary = candidateName + \', Party: \' + candidateParty;\n      candidateId = parseInt(selected.value);\n    }\n\n    document.getElementById(\'ballotSummary\').innerText = ballotSummary;\n    var ballot = {chosenElectionCandidateId: candidateId};\n    submitBallot(ballot);\n  })',NULL,NULL,NULL,NULL),(3,'c','c',NULL,NULL,NULL,_binary '  document.getElementById(\'submitBallotBtn\').addEventListener(\'click\', function() {\n    var selected = document.querySelector(\'input[name=choice]:checked\');\n    var ballotSummary = \'Protest my vote.\';\n    var candidateId = null;\n    if (selected && selected.value) {\n      var candidateEntry = selected.parentNode.parentNode.parentNode;\n      var candidateName = candidateEntry.getElementsByClassName(\'candidate-name\')[0].innerText;\n      var candidateParty = candidateEntry.getElementsByClassName(\'candidate-party\')[0].innerText;\n      ballotSummary = candidateName + \', Party: \' + candidateParty;\n      candidateId = parseInt(selected.value);\n    }\n\n    document.getElementById(\'ballotSummary\').innerText = ballotSummary;\n    var ballot = {chosenElectionCandidateId: candidateId};\n    submitBallot(ballot);\n  })',NULL,NULL,NULL,NULL),(4,'d','d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'e','e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'f','f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'g','g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'h','h',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'i','i',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `voting_systems` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-09 15:19:24
