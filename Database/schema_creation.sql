-- Schema Creation Script for Exam Timetable System

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Table structure for table `algorithm tab`
--

CREATE TABLE IF NOT EXISTS `algorithm tab` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `algorithm_name` varchar(255) DEFAULT NULL,
  `param_name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `checked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `centre`
--

CREATE TABLE IF NOT EXISTS `centre` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `type` int(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `encount` int(23) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `constraint table`
--

CREATE TABLE IF NOT EXISTS `constraint table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `details` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `college_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `college_id` (`college_id`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `centre` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE IF NOT EXISTS `course` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `unit` int(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `semester` int(2) NOT NULL,
  `examtype` int(2) NOT NULL,
  `en_count` int(11) NOT NULL,
  `college_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `examtab`
--

CREATE TABLE IF NOT EXISTS `examtab` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `schedule_policy` varchar(255) DEFAULT NULL,
  `max_examl` int(40) NOT NULL,
  `min_examl` int(40) NOT NULL,
  `exam_level_high_limit` int(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `examtt`
--

CREATE TABLE IF NOT EXISTS `examtt` (
  `matric_no` varchar(255) NOT NULL,
  `deptid` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `programme` varchar(255) DEFAULT NULL,
  `programmeid` int(11) NOT NULL,
  `start_session` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`matric_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `main interface`
--

CREATE TABLE IF NOT EXISTS `main interface` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `days_per_week` int(11) NOT NULL,
  `end_date` date DEFAULT NULL,
  `periods_per_day` int(11) NOT NULL,
  `semester` varchar(255) DEFAULT NULL,
  `session` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `optimization settings`
--

CREATE TABLE IF NOT EXISTS `optimization settings` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `display_progress` tinyint(1) NOT NULL,
  `opt_time` varchar(255) DEFAULT NULL,
  `opt_cycle_count` int(20) NOT NULL,
  `int_mode` tinyint(1) NOT NULL,
  `add_more_time` tinyint(1) NOT NULL,
  `exam_w_time` tinyint(1) NOT NULL,
  `exam_w_cycle` tinyint(1) NOT NULL,
  `exam_w_both` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `output tab`
--

CREATE TABLE IF NOT EXISTS `output tab` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `mix_exams` tinyint(1) NOT NULL,
  `more_space` tinyint(1) NOT NULL,
  `le_fullyinV` tinyint(1) NOT NULL,
  `usehalf_Vspace` tinyint(1) NOT NULL,
  `skip_week` tinyint(1) NOT NULL,
  `sitting_arrangement` tinyint(1) NOT NULL,
  `students_per_staff` int(11) NOT NULL,
  `staff_specialV` int(11) NOT NULL,
  `select_staff_randomly` tinyint(1) NOT NULL,
  `update_staff_Dcount` tinyint(1) NOT NULL,
  `saveTT_csv` tinyint(1) NOT NULL,
  `saveTT_pdf` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE IF NOT EXISTS `program` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `deptID` int(9) NOT NULL,
  `new_codeid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `deptID` (`deptID`),
  CONSTRAINT `program_ibfk_1` FOREIGN KEY (`deptID`) REFERENCES `department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE IF NOT EXISTS `registration` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `regDMC` int(20) NOT NULL,
  `centreID` int(20) NOT NULL,
  `matricno` varchar(255) DEFAULT NULL,
  `session` varchar(255) DEFAULT NULL,
  `semester` int(2) NOT NULL,
  `course_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `centreID` (`centreID`),
  CONSTRAINT `registration_ibfk_1` FOREIGN KEY (`centreID`) REFERENCES `centre` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `slashedcourse`
--

CREATE TABLE IF NOT EXISTS `slashedcourse` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `sem` int(2) NOT NULL,
  `deptid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `deptid` (`deptid`),
  CONSTRAINT `slashedcourse_ibfk_1` FOREIGN KEY (`deptid`) REFERENCES `department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE IF NOT EXISTS `staff` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `surname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `staff_id` int(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `deptid` int(40) DEFAULT NULL,
  `statusID` int(10) DEFAULT NULL,
  `type` int(9) DEFAULT NULL,
  `in_use` int(10) DEFAULT NULL,
  `duty_count` int(20) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `research_area` varchar(255) DEFAULT NULL,
  `discipline` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `deptid` (`deptid`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`deptid`) REFERENCES `department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `Id` int(20) NOT NULL AUTO_INCREMENT,
  `matric_no` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `deptID` int(10) DEFAULT NULL,
  `programmeID` int(20) DEFAULT NULL,
  `start_session` varchar(255) DEFAULT NULL,
  `level` int(40) NOT NULL,
  `programme` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `deptID` (`deptID`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`deptID`) REFERENCES `department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `studentsemreg`
--

CREATE TABLE IF NOT EXISTS `studentsemreg` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `matric_NO` varchar(255) NOT NULL,
  `course_code_list` varchar(255) DEFAULT NULL,
  `session` varchar(255) DEFAULT NULL,
  `semester` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(20) NOT NULL,
  `college_id` int(255) NOT NULL,
  `department_id` int(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfi832e3qv89fq376fuh8920y4` (`department_id`),
  CONSTRAINT `FKfi832e3qv89fq376fuh8920y4` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE IF NOT EXISTS `venue` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `venue_code` varchar(255) DEFAULT NULL,
  `college_id` int(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `Capacity` int(4) NOT NULL,
  `Type` int(1) NOT NULL,
  `Preference` int(2) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `college_id` (`college_id`),
  CONSTRAINT `venue_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `centre` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;
