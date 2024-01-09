-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Час створення: Січ 09 2024 р., 19:58
-- Версія сервера: 10.4.32-MariaDB
-- Версія PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `websitedb`
--

-- --------------------------------------------------------

--
-- Структура таблиці `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `admin`
--

INSERT INTO `admin` (`id`, `login`, `password`) VALUES
(1, 'admin', '7cec85c75537840dad40251576e5b757');

-- --------------------------------------------------------

--
-- Структура таблиці `email`
--

CREATE TABLE `email` (
  `email_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `email`
--

INSERT INTO `email` (`email_id`, `email`, `first_name`, `last_name`) VALUES
(1, 'sinelnik67@gmail.com', 'Andrii', 'Synelnyk');

-- --------------------------------------------------------

--
-- Структура таблиці `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `event_desc` text DEFAULT NULL,
  `event_date` date NOT NULL,
  `event_start_time` time NOT NULL,
  `event_end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `events`
--

INSERT INTO `events` (`id`, `event_name`, `event_desc`, `event_date`, `event_start_time`, `event_end_time`) VALUES
(1, 'Conference on Innovation', 'Join us for an insightful conference on the latest innovations in technology and business.', '2024-02-15', '09:00:00', '17:00:00'),
(2, 'Music Festival', 'Experience a night of live music performances featuring various artists and genres.', '2024-03-22', '18:30:00', '23:00:00'),
(3, 'Art Exhibition Opening', 'Discover the beauty of contemporary art at our gallery opening event.', '2024-04-10', '19:00:00', '21:30:00'),
(4, 'Community Workshop: Sustainability', 'Learn practical tips for a sustainable lifestyle and environmental conservation.', '2024-05-05', '14:00:00', '16:30:00'),
(5, 'Food Tasting and Culinary Showcase', 'Savor the flavors of local and international cuisines in this delightful culinary event.', '2024-06-12', '12:00:00', '15:00:00'),
(7, 'test_event', 'test_desc', '2024-01-10', '16:39:00', '17:39:00');

-- --------------------------------------------------------

--
-- Структура таблиці `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(20) NOT NULL,
  `creation_time` int(11) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `sessions`
--

INSERT INTO `sessions` (`session_id`, `creation_time`) VALUES
('9fcc3f98ed61a449', 1704671602),
('dd536fa7e8ce64ba', 1704817083);

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `email`
--
ALTER TABLE `email`
  ADD PRIMARY KEY (`email_id`);

--
-- Індекси таблиці `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `email`
--
ALTER TABLE `email`
  MODIFY `email_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблиці `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
