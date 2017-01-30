# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.34)
# Database: resys
# Generation Time: 2017-01-30 14:17:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table bookings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `agent_id` int(11) unsigned DEFAULT NULL,
  `description` text,
  `team_id` int(11) unsigned DEFAULT NULL,
  `labels` varchar(100) DEFAULT NULL,
  `customer_id` int(11) unsigned DEFAULT NULL,
  `startdate` timestamp NULL DEFAULT NULL,
  `enddate` timestamp NULL DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `location` varchar(11) DEFAULT NULL,
  `checktime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `agent_id` (`agent_id`),
  KEY `customer_id` (`customer_id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;

INSERT INTO `bookings` (`id`, `title`, `priority`, `agent_id`, `description`, `team_id`, `labels`, `customer_id`, `startdate`, `enddate`, `status`, `location`, `checktime`)
VALUES
	(1,'Booking 1',1,3,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt harum consectetur molestias eum accusamus optio reprehenderit, impedit explicabo aspernatur dolorum voluptatem rem beatae odio, debitis voluptate! \nRerum odio, numquam atque quae laudantium voluptatibus assumenda dolores aspernatur repudiandae. Vitae consequuntur, incidunt!',1,NULL,1,'2017-02-27 00:00:00','2017-02-27 23:59:00',1,NULL,'2017-01-26 00:00:00'),
	(2,'Booking 2',1,5,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt harum consectetur molestias eum accusamus optio reprehenderit, impedit explicabo aspernatur dolorum voluptatem rem beatae odio, debitis voluptate! \nRerum odio, numquam atque quae laudantium voluptatibus assumenda dolores aspernatur repudiandae. Vitae consequuntur, incidunt!',1,NULL,4,'2017-02-28 00:00:00','2017-02-28 23:59:00',1,NULL,'2017-01-26 00:00:00'),
	(3,'Booking 3',1,3,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt harum consectetur molestias eum accusamus optio reprehenderit, impedit explicabo aspernatur dolorum voluptatem rem beatae odio, debitis voluptate! \nRerum odio, numquam atque quae laudantium voluptatibus assumenda dolores aspernatur repudiandae. Vitae consequuntur, incidunt!',1,NULL,4,'2017-03-18 00:00:00','2017-03-18 23:59:00',1,NULL,'2017-01-26 00:00:00'),
	(4,'Booking 4',1,5,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt harum consectetur molestias eum accusamus optio reprehenderit, impedit explicabo aspernatur dolorum voluptatem rem beatae odio, debitis voluptate! \nRerum odio, numquam atque quae laudantium voluptatibus assumenda dolores aspernatur repudiandae. Vitae consequuntur, incidunt!',1,NULL,1,'2017-03-28 00:00:00','2017-03-28 23:59:00',1,NULL,'2017-01-26 00:00:00'),
	(5,'booking 5',3,3,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt harum consectetur molestias eum accusamus optio reprehenderit, impedit explicabo aspernatur dolorum voluptatem rem beatae odio, debitis voluptate! \nRerum odio, numquam atque quae laudantium voluptatibus assumenda dolores aspernatur repudiandae. Vitae consequuntur, incidunt!',1,NULL,4,'2016-06-28 00:00:00','2016-06-28 00:00:00',1,NULL,'2016-05-26 00:00:00'),
	(6,'booking 6',1,3,'here is my desc. hello',1,NULL,4,'2017-03-28 00:00:00','2017-03-28 23:59:00',1,NULL,'2017-01-26 00:00:00'),
	(7,'Booking 7',3,3,'here is my desc. hello',1,NULL,4,'2016-10-28 00:00:00','2016-10-28 00:00:00',1,NULL,'2016-05-26 00:00:00'),
	(13,'Booking Number One',1,3,'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt harum consectetur molestias eum accusamus optio reprehenderit, impedit explicabo aspernatur dolorum voluptatem rem beatae odio, debitis voluptate! \r\nRerum odio, numquam atque quae laudantium voluptatibus assumenda dolores aspernatur repudiandae. Vitae consequuntur, incidunt!',1,'',1,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,NULL,'2017-01-30 01:06:37'),
	(14,'My booking - PHP issue',4,5,'PHP cannot load images',1,'',1,'2017-01-30 00:00:00','2017-01-30 00:00:00',1,NULL,'2017-01-30 01:08:12');

/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table teams
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;

INSERT INTO `teams` (`id`, `name`)
VALUES
	(1,'Team 1'),
	(2,'Team 2'),
	(3,'Team 3');

/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table teams_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teams_users`;

CREATE TABLE `teams_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `team_id` int(11) unsigned DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `teams_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `teams_users_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `teams_users` WRITE;
/*!40000 ALTER TABLE `teams_users` DISABLE KEYS */;

INSERT INTO `teams_users` (`id`, `team_id`, `user_id`)
VALUES
	(1,1,3),
	(2,1,5),
	(3,2,3),
	(4,2,5);

/*!40000 ALTER TABLE `teams_users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `desk` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `last_name`, `role`, `floor`, `desk`)
VALUES
	(1,'user1',NULL,'David','Nevermore','CUSTOMER',NULL,NULL),
	(2,'admin',NULL,'Administrator',NULL,'ADMIN',NULL,NULL),
	(3,'agent1',NULL,'John','Jobs','STAFF',1,2),
	(4,'user2',NULL,'Christian','Anderson','CUSTOMER',NULL,NULL),
	(5,'agent2',NULL,'Mikkele','Clinfield','STAFF',2,3);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
