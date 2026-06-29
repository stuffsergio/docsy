-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-06-2026 a las 14:09:51
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
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subtitle` varchar(150) NOT NULL,
  `body` text NOT NULL,
  `status` enum('pendiente','publicado','eliminado') DEFAULT 'pendiente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_thumb` varchar(255) DEFAULT NULL,
  `last_modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`id`, `title`, `subtitle`, `body`, `status`, `created_at`, `user_id`, `likes`, `image`, `image_thumb`, `last_modified`) VALUES
(62, 'Los nuevos fichajes del Barça', 'El club azulgrana podría competir con los mercados en Europa', 'Con la reciente llegada de Anthony Gordon como nuevo jugador del cuadro dirigido por Hansi Flick, el FC Barcelona está poco a poco recuperando su prestigio para competir con los grandes clubes en el mercado europeo. Aunque aún no ha conseguido llegar a la famosa regla 1:1 (lo que entra, por lo que sale), el club dirigido por Joan Laporta busca dar el toque final con el fichaje de Julián Álvarez, quien ya ha dejado claro al Atlético Madrid que quiere salir este mercado.', 'publicado', '2026-05-29 07:29:18', 1, 2, '/uploads/photos/e282a83b-bee1-4baf-abc9-c9e0d80c8192.webp', '/uploads/photos/thumb_e282a83b-bee1-4baf-abc9-c9e0d80c8192.webp', '2026-06-29 12:02:38'),
(63, 'Los Spurs logran firmar el séptimo partido', 'San Antonio Spurs logra empatar la serie, Ocklahoma no logra sentenciar', 'En una noche en la que necesitaban ganar sí o sí, los San Antonio Spurs lograron alargar la serie y llevarse el sexto partido. A pesar de haber recuperado al lesionado Jalen Williams, Ocklahoma City Thunder no fue capaz de sentenciar la serie, llevándose un parcial de 20-0 abajo durante 8 minutos. El sábado se disputará el séptimo partido que decidirá quién se enfrenta a New York Nicks en unas finales de ensueño', 'publicado', '2026-05-29 07:38:09', 2, 1, '/uploads/photos/0d0e625e-677f-4b00-ac93-0c56984eb507.webp', '/uploads/photos/thumb_0d0e625e-677f-4b00-ac93-0c56984eb507.webp', '2026-06-29 11:37:18'),
(64, 'Explota el nuevo juguete de Jeff Bezos', 'La compañía hace público que no hay víctimas tras el accidente', 'La empresa Blue Origin de la que es dueño Jeff Bezos y con la quiere competir en la carrera espacial con el magnate Elon Musk, ha explotado en el aire a pocos segundos de despegar, aún se desconocen los hechos por lo que ha podido ocurrir esta causa. Sin embargo, deja muy en el aire la posibilidad de ser uno de los líderes en la carerra por dominar el espacio, todo esto a pocas semanas de los recientes éxitos de Elon Musl junto con su empresa SpaceX, la cual ha realizado ya las 12 operaciones que tenía planeado antes de salir al espacio y ahora quiere salir a bolsa.', 'publicado', '2026-05-29 07:45:12', 3, 1, '/uploads/photos/38d5d90b-9fad-4cf6-a7e2-4d706e922a54.webp', '/uploads/photos/thumb_38d5d90b-9fad-4cf6-a7e2-4d706e922a54.webp', '2026-06-29 12:07:40'),
(65, 'El ébola atiza de nuevo en África', 'Ya son 220 los fallecidos por este virus, aunque los líderes mundiales no han puesto su mirada todavía', 'Uno de los recientes casos ha sido un médico graduado en la Universidad de Bunia hace apenas 3 años, falleció salvando vidas en un hospital de República del Congo, a él se junta otro médico dos días, estos casos ha sacudido la comunidad sanitaria de Ituri. Desde el inicio, ya se han detectado más de 900 casos desde los últimos meses.', 'publicado', '2026-05-29 07:55:47', 3, 0, '/uploads/photos/ca4704f4-437c-4b21-b135-4b4202f4d3d5.webp', '/uploads/photos/thumb_ca4704f4-437c-4b21-b135-4b4202f4d3d5.webp', '2026-06-26 12:12:30'),
(68, 'SA Spurs deja sin final a Shai y sus secuaces', 'Wemby en lágrimas tras pasar a la final de la NBA', 'En un Game 7 de final, los San Antonio Spurs se hacen con la victoria y pasan a la final contra New York Nicks. Shai se queda sin posibilidad de ganar el anillo de manera consecutiva y mantiene la racha de 9 años sin repetir campeón. A pesar del partidazo de C. Wallace y sus triples para mantener en vida a Ocklahoma, Chet Holgrem solo tiró dos veces a canasta.', 'publicado', '2026-06-01 09:56:14', 2, 0, '/uploads/photos/13647432-2089-40b5-81a7-fc3ffad62974.webp', '/uploads/photos/thumb_13647432-2089-40b5-81a7-fc3ffad62974.webp', '2026-06-26 12:12:30'),
(70, 'España se estrena en el Mundial', 'Todas las miradas están pendientes a este jugador', 'El próximo 15 de junio la selección española se enfrenta a Cabo Verde en el primer partido de los español en este mundial. La lista de De la Fuente deja atrás a jugadores del Madrid, algo inédito y que pasaba en décadas, es cierto que no ha sido la temporada de los blancos y que no tienen muchos jugadores españoles, pero no ha dejado con la boca cerrada a ningún periodista, estos han aprovechado para preguntar lo antes posibles por este suceso.', 'publicado', '2026-06-01 10:34:56', 2, 0, '/uploads/photos/eb635a8e-71f9-40da-b79e-94583cd0ebb6.webp', '/uploads/photos/thumb_eb635a8e-71f9-40da-b79e-94583cd0ebb6.webp', '2026-06-26 12:12:30'),
(76, 'Las elecciones del Madrid', 'Florentino gana las elecciones', 'A pesar de la derrota del nuevo candidato que ha estado en boca de todos durante las últimas semanas, Riquelme ha declarado que los socios del Real Madrid no volverán a estar 20 años sin votar, lo que ha levantado sospechas de una posible repostulación dentro de 4 años cuando Florentino vuelva a convocar elecciones', 'publicado', '2026-06-08 10:09:42', 1, 0, '/uploads/photos/c6b69cf6-3677-433b-9954-993a5958ef97.webp', '/uploads/photos/thumb_c6b69cf6-3677-433b-9954-993a5958ef97.webp', '2026-06-26 12:12:30'),
(81, 'Wembanyama hace de las suyas', 'SA Antonio Spurs da el golpe sobre la mesa en Madison', 'Tras el contundente 2 - 0 y sumado a la racha de 12 victorias de NY Nicks, los Spurs necesitaban de su estrella para seguir compitiendo por el título, porque un 3 - 0 hubiese sido muy contundente. Anoche Wemby hizo lo que tenía que hacer y empezó el partido con la mente en su objetivo, junto con un imponente Fox hicieron la noche que necesitaba el equipo para continuar peleando por el título.\r\n', 'publicado', '2026-06-08 11:56:02', 9, 0, '/uploads/photos/47dbe19f-53d6-4a5c-a6f9-66e7b76f46b4.webp', '/uploads/photos/thumb_47dbe19f-53d6-4a5c-a6f9-66e7b76f46b4.webp', '2026-06-29 11:33:56'),
(83, 'España ahora sí sentencia', 'Se impone 3 - 1 a Perú en el camino al Mundial', 'Terminan los preparatorios del Mundial con el partido que anoche se disputó en EEUU entre España y Perú, los de De la Fuente venían de un partido amargo en casa. Pero en este partido sabían que tenían que dar algo más para ser consideradas una de las favoritas, a pesar de que sus estrellas más destacadas aún están terminando de ponerse a punto.', 'publicado', '2026-06-09 09:53:27', 9, 0, '/uploads/photos/0ba19aa2-8f53-4248-9cd5-eac71aef834c.webp', '/uploads/photos/thumb_0ba19aa2-8f53-4248-9cd5-eac71aef834c.webp', '2026-06-26 12:12:30'),
(87, 'Otra vez no es suficiente', 'Anoche volvió a remontar NY Nicks', 'No pasa desapercibido la capacidad de los Nicks para aguantar todo el partido una diferencia de 20 puntos, llegar al 3er cuarto y volver a poner la máquina a funcionar. Los Spurs hicieron una de las mejores actuaciones de las finales en la primera mitad del partido, pero no les fue suficiente, con un desatado OG Anunoby y con la estrella del equipo Jalen Brunson, consiguieron remontar un partido que estaba quedando frío el Madison Square Garden y que hubiese mandado la serie a San Antonio muy de cara a los locales.', 'eliminado', '2026-06-11 09:57:36', 9, 0, NULL, NULL, '2026-06-26 12:12:30'),
(90, 'España se la juega contra Uruguay', 'La selección española se la juega para ver su próximo rival', 'En caso de que España gane el partido contra la selección uruguaya, pasaría como primera de grupo y se enfrentaría a un rival más asequible que si perdiese o empatase. En este último caso, se enfrentaría a la vigente campeona del mundo, Argentina, la cual tiene al mejor jugador de todos los tiempos rindiendo a un nivel altísimo. Aunque estas dos selecciones no se hayan enfrentado muchas veces en su historia, el encuentro podría llegar a ser incluso una final anticipada. Los de De La Fuente deben ponerse las pilas y tratar de pasar como primeras de grupo para facilitar las cosas en el futuro no muy lejano.', 'publicado', '2026-06-25 12:18:23', 9, 0, '/uploads/photos/4143aa49-201f-4fa3-b3ae-302142c257d6.webp', '/uploads/photos/thumb_4143aa49-201f-4fa3-b3ae-302142c257d6.webp', '2026-06-26 12:12:30');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_documentos_user` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD CONSTRAINT `fk_documentos_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
