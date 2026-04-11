-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2026 at 08:50 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nest_products`
--
CREATE DATABASE IF NOT EXISTS `nest_products` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
USE `nest_products`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `date`) VALUES
(1, 'Laptop Dell XPS 13', 1299.99, '2024-01-15'),
(2, 'Mysz bezprzewodowa Logitech', 49.99, '2024-01-14'),
(3, 'poprawka', 23.67, '2026-04-02'),
(4, 'Monitor LG 27 cali 4K', 399.99, '2024-01-12'),
(5, 'Słuchawki Sony WH-1000XM5', 379.99, '2024-01-11'),
(6, 'Stacja dokująca USB-C', 89.99, '2024-01-10'),
(7, 'SSD Samsung 1TB NVMe', 99.99, '2024-01-09'),
(8, 'Webcam Full HD Razer', 99.99, '2024-01-08'),
(9, 'Podkładka pod mysz SteelSeries', 34.99, '2024-01-07'),
(10, 'Adapter HDMI 2.1', 24.99, '2024-01-06');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
