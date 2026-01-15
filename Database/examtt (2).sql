-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2025 at 05:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `examtt`
--

-- --------------------------------------------------------

--
-- Table structure for table `algorithm tab`
--

CREATE TABLE `algorithm tab` (
  `id` int(255) NOT NULL,
  `algorithm_name` varchar(255) DEFAULT NULL,
  `param_name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `checked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `algorithm tab`
--

INSERT INTO `algorithm tab` (`id`, `algorithm_name`, `param_name`, `value`, `checked`) VALUES
(1, 'geneticAlgorithm', 'population', '23', 0),
(2, 'geneticAlgorithm', 'Operationcount', '', 0),
(3, 'geneticAlgorithm', 'CrossOverType', 'w1', 1),
(4, 'geneticAlgorithm', 'TournamentType', '', 0),
(5, 'geneticAlgorithm', 'population', '23', 0),
(6, 'geneticAlgorithm', 'Operationcount', '', 0),
(7, 'geneticAlgorithm', 'CrossOverType', 'w1', 1),
(8, 'geneticAlgorithm', 'TournamentType', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `centre`
--

CREATE TABLE `centre` (
  `id` int(20) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `type` int(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `encount` int(23) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `centre`
--

INSERT INTO `centre` (`id`, `code`, `type`, `name`, `encount`) VALUES
(1, 'COLFAST', 0, 'College of f something', 1),
(2, 'COLNAS', 2, 'College of natural sciences', 2);

-- --------------------------------------------------------

--
-- Table structure for table `constraint table`
--

CREATE TABLE `constraint table` (
  `id` int(11) NOT NULL,
  `details` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `constraint table`
--

INSERT INTO `constraint table` (`id`, `details`, `name`, `type`) VALUES
(15, NULL, NULL, NULL),
(16, NULL, NULL, NULL),
(17, 'sdf', 'periodInclusive', 'Period Inclusive Exams'),
(18, 'adf', 'periodExclusive', 'Period Exclusive Exams'),
(19, 'mondays', 'EXexEX', 'Exam Exclusive Exams'),
(20, 'fg', 'periodInclusive', 'Period Inclusive Exams'),
(21, 'This is a new period Inclusive Exams constraint', 'periodInclusive', 'Period Inclusive Exams'),
(22, 'This is a new period Inclusive Exams constraint', 'periodInclusive', 'Period Inclusive Exams'),
(23, 'This is a Venue Inclusive Exams Constraint', 'VenInc', 'Venue Inclusive Exams'),
(24, 'This is an Exam After Exams Constraints', 'ExamAfEx', 'Exams After Exams'),
(25, '', 'periodExclusive', 'Period Exclusive Exams'),
(26, 'dgjtyc', 'periodInclusive', 'Period Inclusive Exams'),
(27, 'dgjtyc,ctyyugkj,dtycgh', 'periodInclusive', 'Period Inclusive Exams'),
(28, 'thisi is a constraint,Thisi is another PIE constraint', 'periodInclusive', 'Period Inclusive Exams'),
(29, 'This is a PEV constraint', 'periodExVen', 'Period Exclusive Venues'),
(30, 'This is a VIE Constraint', 'VenInc', 'Venue Inclusive Exams'),
(31, 'This is a EAE constraint,This is another EAE constraint', 'ExamAfEx', 'Exams After Exams');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(20) NOT NULL,
  `code` varchar(255) NOT NULL,
  `unit` int(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `semester` int(2) NOT NULL,
  `examtype` int(2) NOT NULL,
  `en_count` int(11) NOT NULL,
  `college_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `code`, `unit`, `title`, `semester`, `examtype`, `en_count`, `college_id`, `department_id`) VALUES
(1, 'CMP312 ', 3, 'Intro to Computer', 2, 2, 2, 1, 1),
(2, 'BCH319', 3, 'Micro-Organisms', 1, 2, 2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(2) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `college_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `code`, `college_id`) VALUES
(1, 'Computing', 'wed2', 2),
(2, 'Biochemistry', 'BIO213', 1);

-- --------------------------------------------------------

--
-- Table structure for table `examtab`
--

CREATE TABLE `examtab` (
  `id` bigint(20) NOT NULL,
  `schedule_policy` varchar(255) DEFAULT NULL,
  `max_examl` int(40) NOT NULL,
  `min_examl` int(40) NOT NULL,
  `exam_level_high_limit` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `examtab`
--

INSERT INTO `examtab` (`id`, `schedule_policy`, `max_examl`, `min_examl`, `exam_level_high_limit`) VALUES
(1, 'bevnisd', 0, 21, 150),
(2, 'ukfftudhy', 0, 22, 29),
(3, 'ukfftudhy', 0, 22, 29),
(4, 'ukfftudhy', 0, 22, 29),
(5, 'yqboer', 100, 12, 32);

-- --------------------------------------------------------

--
-- Table structure for table `examtt`
--

CREATE TABLE `examtt` (
  `matric_no` varchar(255) NOT NULL,
  `deptid` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `programme` varchar(255) DEFAULT NULL,
  `programmeid` int(11) NOT NULL,
  `start_session` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `main interface`
--

CREATE TABLE `main interface` (
  `id` bigint(20) NOT NULL,
  `days_per_week` int(11) NOT NULL,
  `end_date` date DEFAULT NULL,
  `periods_per_day` int(11) NOT NULL,
  `semester` varchar(255) DEFAULT NULL,
  `session` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `main interface`
--

INSERT INTO `main interface` (`id`, `days_per_week`, `end_date`, `periods_per_day`, `semester`, `session`, `start_date`) VALUES
(1, 5, '2025-08-23', 2, 'First', '2025/2026', '2025-08-14'),
(2, 5, '2025-08-23', 2, 'First', '2025/2026', '2025-08-14');

-- --------------------------------------------------------

--
-- Table structure for table `optimization settings`
--

CREATE TABLE `optimization settings` (
  `id` int(20) NOT NULL,
  `display_progress` tinyint(1) NOT NULL,
  `opt_time` varchar(255) DEFAULT NULL,
  `opt_cycle_count` int(20) NOT NULL,
  `int_mode` tinyint(1) NOT NULL,
  `add_more_time` tinyint(1) NOT NULL,
  `exam_w_time` tinyint(1) NOT NULL,
  `exam_w_cycle` tinyint(1) NOT NULL,
  `exam_w_both` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `optimization settings`
--

INSERT INTO `optimization settings` (`id`, `display_progress`, `opt_time`, `opt_cycle_count`, `int_mode`, `add_more_time`, `exam_w_time`, `exam_w_cycle`, `exam_w_both`) VALUES
(1, 1, '24ed', 2, 1, 0, 1, 1, 1),
(2, 1, '', 0, 0, 0, 1, 1, 1),
(3, 0, '', 0, 0, 0, 0, 0, 0),
(4, 0, '', 0, 0, 0, 0, 0, 0),
(5, 0, '', 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `output tab`
--

CREATE TABLE `output tab` (
  `id` int(20) NOT NULL,
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
  `saveTT_pdf` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `output tab`
--

INSERT INTO `output tab` (`id`, `mix_exams`, `more_space`, `le_fullyinV`, `usehalf_Vspace`, `skip_week`, `sitting_arrangement`, `students_per_staff`, `staff_specialV`, `select_staff_randomly`, `update_staff_Dcount`, `saveTT_csv`, `saveTT_pdf`) VALUES
(1, 0, 0, 0, 0, 0, 0, 2, 7, 0, 0, 0, 0),
(2, 1, 0, 1, 0, 1, 0, 2, 7, 1, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `id` int(5) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `deptID` int(9) NOT NULL,
  `new_codeid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`id`, `name`, `code`, `deptID`, `new_codeid`) VALUES
(1, 'Nursing', 'NLH103', 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(20) NOT NULL,
  `regDMC` int(20) NOT NULL,
  `centreID` int(20) NOT NULL,
  `matricno` varchar(255) DEFAULT NULL,
  `session` varchar(255) DEFAULT NULL,
  `semester` int(2) NOT NULL,
  `course_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `regDMC`, `centreID`, `matricno`, `session`, `semester`, `course_code`) VALUES
(1, 3, 2, 'efs1/3', '2023/2024', 2, 'edg2');

-- --------------------------------------------------------

--
-- Table structure for table `slashedcourse`
--

CREATE TABLE `slashedcourse` (
  `id` int(3) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `sem` int(2) NOT NULL,
  `deptid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slashedcourse`
--

INSERT INTO `slashedcourse` (`id`, `code`, `type`, `sem`, `deptid`) VALUES
(1, 'Rf5', 'wr', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(255) NOT NULL,
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
  `discipline` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `surname`, `firstname`, `middlename`, `staff_id`, `title`, `deptid`, `statusID`, `type`, `in_use`, `duty_count`, `specialization`, `research_area`, `discipline`) VALUES
(7, 'reds', 'erd', 'fdc', 0, 'ersd', 2, 3, 3, 3, 3, 'df', 'fdc', 'gfd'),
(8, 'df', 'trfd', 're', 0, 'tr4ed', 1, 3, 3, 2, 3, 't5rf', 'rfd', 'rfd'),
(9, 'we', 'wed', 'wede', 12, 'wef', 1, 1, 2, 1, 2, 'wed', 'wrf', 'computer science');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `Id` int(20) NOT NULL,
  `matric_no` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `deptID` int(10) DEFAULT NULL,
  `programmeID` int(20) DEFAULT NULL,
  `start_session` varchar(255) DEFAULT NULL,
  `level` int(40) NOT NULL,
  `programme` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`Id`, `matric_no`, `surname`, `firstname`, `middlename`, `gender`, `deptID`, `programmeID`, `start_session`, `level`, `programme`) VALUES
(15, 'ai/scp/w3/30', 'sfe', 'wf', 'wed', 'MALE', 1, 1, '20203/23', 400, 'CMP'),
(16, 'w4r', 'wrf', 'fr', 'was', 'FEMALE', 1, 2, '20234', 200, 'CSC'),
(17, '2034', 'fer', 'do', 'mi', 'SHEMALE', 2, 1, '20234', 200, 'BCH');

-- --------------------------------------------------------

--
-- Table structure for table `studentsemreg`
--

CREATE TABLE `studentsemreg` (
  `id` int(12) NOT NULL,
  `matric_NO` varchar(255) NOT NULL,
  `course_code_list` varchar(255) DEFAULT NULL,
  `session` varchar(255) DEFAULT NULL,
  `semester` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentsemreg`
--

INSERT INTO `studentsemreg` (`id`, `matric_NO`, `course_code_list`, `session`, `semester`) VALUES
(1, 'sd', 'zd', 'sdv', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(20) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(20) NOT NULL,
  `college_id` int(255) NOT NULL,
  `department_id` int(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `role`, `college_id`, `department_id`, `username`) VALUES
(1, 'admin101', 'ADMIN', 0, NULL, 'admin'),
(4, 'abcd', 'DEPARTMENT_REP', 0, 1, 'cscdept'),
(5, 'abcde', 'DEPARTMENT_REP', 1, 2, 'bchdept');

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE `venue` (
  `id` int(3) NOT NULL,
  `venue_code` varchar(255) DEFAULT NULL,
  `college_id` int(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `Capacity` int(4) NOT NULL,
  `Type` int(1) NOT NULL,
  `Preference` int(2) NOT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `venue`
--

INSERT INTO `venue` (`id`, `venue_code`, `college_id`, `name`, `Capacity`, `Type`, `Preference`, `location`) VALUES
(7, 'we2', 1, 'wee', 23, 2, 1, 'erds');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `algorithm tab`
--
ALTER TABLE `algorithm tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `centre`
--
ALTER TABLE `centre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `constraint table`
--
ALTER TABLE `constraint table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`),
  ADD KEY `college_id` (`college_id`);

--
-- Indexes for table `examtab`
--
ALTER TABLE `examtab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `examtt`
--
ALTER TABLE `examtt`
  ADD PRIMARY KEY (`matric_no`);

--
-- Indexes for table `main interface`
--
ALTER TABLE `main interface`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `optimization settings`
--
ALTER TABLE `optimization settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `output tab`
--
ALTER TABLE `output tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deptID` (`deptID`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`),
  ADD KEY `centreID` (`centreID`);

--
-- Indexes for table `slashedcourse`
--
ALTER TABLE `slashedcourse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deptid` (`deptid`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deptid` (`deptid`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `deptID` (`deptID`);

--
-- Indexes for table `studentsemreg`
--
ALTER TABLE `studentsemreg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKfi832e3qv89fq376fuh8920y4` (`department_id`);

--
-- Indexes for table `venue`
--
ALTER TABLE `venue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `college_id` (`college_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `algorithm tab`
--
ALTER TABLE `algorithm tab`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `centre`
--
ALTER TABLE `centre`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `constraint table`
--
ALTER TABLE `constraint table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `examtab`
--
ALTER TABLE `examtab`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `main interface`
--
ALTER TABLE `main interface`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `optimization settings`
--
ALTER TABLE `optimization settings`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `output tab`
--
ALTER TABLE `output tab`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `slashedcourse`
--
ALTER TABLE `slashedcourse`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `Id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `studentsemreg`
--
ALTER TABLE `studentsemreg`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`);

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `centre` (`id`);

--
-- Constraints for table `program`
--
ALTER TABLE `program`
  ADD CONSTRAINT `program_ibfk_1` FOREIGN KEY (`deptID`) REFERENCES `department` (`id`);

--
-- Constraints for table `registration`
--
ALTER TABLE `registration`
  ADD CONSTRAINT `registration_ibfk_1` FOREIGN KEY (`centreID`) REFERENCES `centre` (`id`);

--
-- Constraints for table `slashedcourse`
--
ALTER TABLE `slashedcourse`
  ADD CONSTRAINT `slashedcourse_ibfk_1` FOREIGN KEY (`deptid`) REFERENCES `department` (`id`);

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`deptid`) REFERENCES `department` (`id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`deptID`) REFERENCES `department` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FKfi832e3qv89fq376fuh8920y4` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`);

--
-- Constraints for table `venue`
--
ALTER TABLE `venue`
  ADD CONSTRAINT `venue_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `centre` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
