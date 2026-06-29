-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-06-2026 a las 14:09:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lista_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `avatar_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `avatar_img`) VALUES
(1, 'Sofía', 'sofia@gmail.com', '$2b$10$1/JqUJwYaCIlhy8u5S30NurICAoRuq3dDqmGaNLT/DFTinHyFh4zm', 'user', '2026-05-29 10:20:48', NULL),
(2, 'Jesús', 'jesus@gmail.com', '$2b$10$H1eC0487/AOQolAMwmuMIOUed.2RsE4VqTJXxZb6e8GVcOdzkjuPy', 'admin', '2026-05-29 10:21:50', NULL),
(3, 'Luz', 'luz@gmail.com', '$2b$10$Bsyq6YpV843NN7yNFvGeBevH6xClUxp6eOa.dmR1JuvYyGSL6TeTK', 'admin', '2026-05-29 10:22:37', NULL),
(8, 'Sergio', 'sergio@gmail.com', '$2b$10$EFvMW2jxJl7S8WCLA/LEhO4/P74OeulzAGFiCkEqVk/4yWJC3EyWy', 'user', '2026-06-05 11:05:01', 'https://www.gravatar.com/avatar/7cf8a4b2b8b894628e5247e1e57f059e743c394cccea2713319640fb94b04552'),
(9, 'Sergio2', 'sergioperezmontalvo@gmail.com', '$2b$10$VRHhc3RyHCMv7I64x21nkO67OWOB0EqkMoLYXOIwDnS82NrsJCLk6', 'user', '2026-06-05 11:05:54', 'https://www.gravatar.com/avatar/33bb63488c392c7864349f1e7a7aaffa5d3d67b4a9f166216169f101ad5ab74f');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
