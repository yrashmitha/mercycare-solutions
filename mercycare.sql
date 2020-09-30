-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2020 at 04:03 PM
-- Server version: 10.1.39-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mercycare`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `appointment_status_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `fire_patient_uid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fire_user_uid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `patient_id`, `user_id`, `appointment_status_id`, `created_at`, `updated_at`, `fire_patient_uid`, `fire_user_uid`) VALUES
('c2c0d02b-8d82-4a31-87a4-80d0c24f88f4', 'ffb378ce-2c5b-4c99-b363-d8d6b57c551c', 'd413ebd5-ab9c-460f-ace9-31ac814f9bac', 4, '2020-07-08 04:30:32', '2020-07-08 04:35:06', 'ASNDbdTiDEgAdioNfS8GabtpRj53', 'cQWPHya8bMYT0nGAlmWR2066J0s2');

-- --------------------------------------------------------

--
-- Table structure for table `appointment_details`
--

CREATE TABLE `appointment_details` (
  `appointment_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transport_id` bigint(20) UNSIGNED DEFAULT '5',
  `patient_geo_cords_as_string` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_geo_cords_as_string` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `distance` double(8,2) DEFAULT NULL,
  `duration` char(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double(8,2) DEFAULT NULL,
  `patient_completed` tinyint(1) NOT NULL DEFAULT '0',
  `user_completed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `extra_message` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_enabled` int(1) DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointment_details`
--

INSERT INTO `appointment_details` (`appointment_id`, `transport_id`, `patient_geo_cords_as_string`, `user_geo_cords_as_string`, `address`, `distance`, `duration`, `price`, `patient_completed`, `user_completed`, `created_at`, `updated_at`, `extra_message`, `tracking_enabled`) VALUES
('c2c0d02b-8d82-4a31-87a4-80d0c24f88f4', 1, '{\"lat\":7.274982,\"long\":80.6119904}', '{\"lat\":6.061673253169676,\"long\":80.44161876198729}', 'Peradeniya Rd, Kandy, Sri Lanka', 235.00, '4 hours 32 mins', 8250.00, 1, 1, '2020-07-08 04:30:33', '2020-07-08 04:35:06', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `appointment_statuses`
--

CREATE TABLE `appointment_statuses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `appointment_status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointment_statuses`
--

INSERT INTO `appointment_statuses` (`id`, `appointment_status`, `created_at`, `updated_at`) VALUES
(1, 'Pending', NULL, NULL),
(2, 'Accepted', NULL, NULL),
(3, 'On Going', NULL, NULL),
(4, 'Completed', NULL, NULL),
(5, 'Declined', NULL, NULL),
(6, 'Cancelled', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_resets_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2020_06_19_041959_create_roles_table', 1),
(4, '2020_06_19_042744_create_statuses_table', 1),
(5, '2020_06_19_042745_create_users_table', 1),
(6, '2020_06_19_043327_create_specializations_table', 1),
(7, '2020_06_19_043631_create_user_specializations_table', 1),
(8, '2020_06_19_044147_create_transports_table', 1),
(9, '2020_06_19_044226_create_user_transports_table', 1),
(10, '2020_06_19_045226_create_patients_table', 1),
(11, '2020_06_19_051803_create_patient_avatars_table', 1),
(12, '2020_06_19_052018_create_appointment_statuses_table', 1),
(13, '2020_06_19_052316_create_appointments_table', 1),
(14, '2020_06_19_053234_create_appointment_details_table', 1),
(15, '2020_06_19_055447_create_payments_table', 1),
(16, '2020_06_19_061709_create_user_avatars_table', 1),
(17, '2020_06_25_052731_add_price_per_km_to_users_table', 2),
(18, '2020_06_25_070601_add_custom_message_to_appointment_details_table', 3),
(19, '2020_06_26_100115_add_fire_base_patient_id_to_appointments_table', 4),
(20, '2020_07_15_041754_create_patient_member_table', 5),
(21, '2020_07_15_043550_create_patient_members_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile_num` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `f_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `l_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nic` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `geo_cords` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `mobile_num`, `email`, `code`, `active`, `password`, `f_name`, `l_name`, `nic`, `title`, `address`, `geo_cords`, `path`, `created_at`, `updated_at`) VALUES
('a756e768-8813-419a-a2f5-0da6ab9b1038', '+94752110342', 'nipuninuwanthi@gmail.com', NULL, 1, '$2y$10$P2ciXyHAhwA.x2FEg8vTleTaEgOYHohY3VGRos3uep7T6ajx7fZzS', 'Nipuni', 'Nuwanthi', '971991762v', 'Mrs', 'gorakapitiya', '{\"lat\":6.8107602,\"long\":79.94129989999999}', '', '2020-07-15 04:49:43', '2020-07-15 04:50:00'),
('e3cd21d9-f271-4a88-8836-c159d8978a70', '+94772410341', 'null', NULL, 0, '$2y$10$RgHyufDwbzYQ6Vb39PREAeuZyK3kGmVQ4ZRwRP0fGfNRxnaT94r7K', 'P.W.', 'Chandrani', NULL, 'Mrs', 'gorakapitiya', '{\"lat\":6.8107602,\"long\":79.94129989999999}', '', '2020-07-15 06:31:53', '2020-07-15 06:31:53'),
('ffb378ce-2c5b-4c99-b363-d8d6b57c551c', '+94776891125', 'abc@gmail.com', NULL, 1, '$2y$10$ttqz.TenCkzk1B4j2FBZyeUBoYkffxQRWYp80ya6MMvMqzIvph4AO', 'yohan', 'rashmitha', 'dsaaaaaaaaaaaaaaaaaaaaa', 'Mr', 'No. 170/A Boys town Rd, Kandana', '{\"lat\":7.048791447793344,\"long\":79.90915400682373}', '', '2020-06-24 23:05:14', '2020-06-24 23:05:55');

-- --------------------------------------------------------

--
-- Table structure for table `patient_avatars`
--

CREATE TABLE `patient_avatars` (
  `patient_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `patient_avatars`
--

INSERT INTO `patient_avatars` (`patient_id`, `path`, `created_at`, `updated_at`) VALUES
('a756e768-8813-419a-a2f5-0da6ab9b1038', 'patient-avatars/LepS14wF9l44rV0JBM7bBpIvVM8XiuOObSux5k24.jpeg', '2020-07-15 04:51:51', '2020-07-15 04:51:51'),
('e3cd21d9-f271-4a88-8836-c159d8978a70', NULL, '2020-07-15 06:31:54', '2020-07-15 06:31:54'),
('ffb378ce-2c5b-4c99-b363-d8d6b57c551c', 'patient-avatars/EnoJFHuHAjs9qGEWMHaRvHhB1J4lDLPzmkvbHMx5.jpeg', '2020-07-12 03:17:28', '2020-07-12 03:17:28');

-- --------------------------------------------------------

--
-- Table structure for table `patient_members`
--

CREATE TABLE `patient_members` (
  `patient_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `member_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `patient_members`
--

INSERT INTO `patient_members` (`patient_id`, `member_id`, `id`, `created_at`, `updated_at`) VALUES
('a756e768-8813-419a-a2f5-0da6ab9b1038', 'e3cd21d9-f271-4a88-8836-c159d8978a70', 'a756e768-8813-419a-a2f5-0da6ab9b1038mercye3cd21d9-f271-4a88-8836-c159d8978a70', '2020-07-15 06:31:53', '2020-07-15 06:31:53');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `appointment_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `created_at`, `updated_at`) VALUES
(1, 'Doctor', NULL, NULL),
(2, 'Nurse', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `specializations`
--

CREATE TABLE `specializations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `specialization_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `specializations`
--

INSERT INTO `specializations` (`id`, `specialization_name`, `created_at`, `updated_at`) VALUES
(1, 'ANTIBACTERIAL', NULL, NULL),
(2, 'OXYBUTYNIN CHLORIDE', NULL, NULL),
(3, 'PRAVASTATIN SODIUM', NULL, NULL),
(4, 'Allergy', NULL, NULL),
(5, 'Neutrogena Shine Control Makeup', NULL, NULL),
(6, 'Levetiracetam', NULL, NULL),
(7, 'Enlon Plus', NULL, NULL),
(8, 'Added Strength Pain Reliever', NULL, NULL),
(9, 'Bio Impatiens', NULL, NULL),
(10, 'VANICREAM', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `status_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `status_name`, `created_at`, `updated_at`) VALUES
(1, 'Available', NULL, NULL),
(2, 'On work', NULL, NULL),
(3, 'Out of Office', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transports`
--

CREATE TABLE `transports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transport_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transports`
--

INSERT INTO `transports` (`id`, `transport_type`, `created_at`, `updated_at`) VALUES
(1, 'Car', NULL, NULL),
(2, 'Van', NULL, NULL),
(3, 'Taxi', NULL, NULL),
(4, 'Motor Bicycle', NULL, NULL),
(5, 'Default', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_num` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `price_per_hour` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `address`, `phone_num`, `password`, `status_id`, `role_id`, `remember_token`, `created_at`, `updated_at`, `price_per_hour`) VALUES
('1926d5be-e121-4f53-a8b0-f1a53061ff08', 'user1', 'yrenterprices@gmail.com', NULL, '0776891125', '0b4e7a0e5fe84ad35fb5f95b9ceeac79', 1, 1, NULL, '2020-06-25 00:32:40', '2020-06-25 00:32:40', 1200),
('d413ebd5-ab9c-460f-ace9-31ac814f9bac', 'Lasantha Anuradha', 'user@gmail.com', NULL, '0776891125', '$2y$10$qmrE5Q9gh3RAg1Dmgc36geNaiqzbY9kcpCg65jAN1JOMEQ5ykKl26', 1, 1, NULL, '2020-06-26 02:34:00', '2020-07-12 07:41:56', 1300);

-- --------------------------------------------------------

--
-- Table structure for table `user_avatars`
--

CREATE TABLE `user_avatars` (
  `user_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_avatars`
--

INSERT INTO `user_avatars` (`user_id`, `path`, `created_at`, `updated_at`) VALUES
('1926d5be-e121-4f53-a8b0-f1a53061ff08', NULL, NULL, NULL),
('d413ebd5-ab9c-460f-ace9-31ac814f9bac', 'user-avatars/n7IbYgwiLlt2gRouPZpvG9j31mS49oHAVkXCfKjR.jpeg', '2020-07-12 07:43:25', '2020-07-12 07:43:25');

-- --------------------------------------------------------

--
-- Table structure for table `user_specializations`
--

CREATE TABLE `user_specializations` (
  `user_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specialization_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_specializations`
--

INSERT INTO `user_specializations` (`user_id`, `specialization_id`, `created_at`, `updated_at`) VALUES
('1926d5be-e121-4f53-a8b0-f1a53061ff08', 4, NULL, NULL),
('d413ebd5-ab9c-460f-ace9-31ac814f9bac', 1, '2020-07-12 07:42:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_transports`
--

CREATE TABLE `user_transports` (
  `user_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transport_id` bigint(20) UNSIGNED NOT NULL,
  `price_per_km` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_transports`
--

INSERT INTO `user_transports` (`user_id`, `transport_id`, `price_per_km`, `created_at`, `updated_at`) VALUES
('1926d5be-e121-4f53-a8b0-f1a53061ff08', 1, 100, NULL, NULL),
('d413ebd5-ab9c-460f-ace9-31ac814f9bac', 1, 125, NULL, '2020-07-12 07:43:13'),
('d413ebd5-ab9c-460f-ace9-31ac814f9bac', 2, 80, NULL, NULL),
('d413ebd5-ab9c-460f-ace9-31ac814f9bac', 3, 100, NULL, '2020-07-12 07:42:47'),
('d413ebd5-ab9c-460f-ace9-31ac814f9bac', 5, 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_appointment_status_foreign` (`appointment_status_id`),
  ADD KEY `appointments_patient_id_foreign` (`patient_id`),
  ADD KEY `appointments_user_id_foreign` (`user_id`);

--
-- Indexes for table `appointment_details`
--
ALTER TABLE `appointment_details`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `appointment_details_transport_id_foreign` (`transport_id`);

--
-- Indexes for table `appointment_statuses`
--
ALTER TABLE `appointment_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient_avatars`
--
ALTER TABLE `patient_avatars`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `patient_members`
--
ALTER TABLE `patient_members`
  ADD PRIMARY KEY (`patient_id`,`member_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specializations`
--
ALTER TABLE `specializations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transports`
--
ALTER TABLE `transports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_status_id_foreign` (`status_id`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- Indexes for table `user_avatars`
--
ALTER TABLE `user_avatars`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_specializations`
--
ALTER TABLE `user_specializations`
  ADD PRIMARY KEY (`user_id`,`specialization_id`),
  ADD KEY `user_specializations_specialization_id_foreign` (`specialization_id`);

--
-- Indexes for table `user_transports`
--
ALTER TABLE `user_transports`
  ADD PRIMARY KEY (`user_id`,`transport_id`),
  ADD KEY `user_transports_transport_id_foreign` (`transport_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment_statuses`
--
ALTER TABLE `appointment_statuses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `specializations`
--
ALTER TABLE `specializations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transports`
--
ALTER TABLE `transports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_appointment_status_foreign` FOREIGN KEY (`appointment_status_id`) REFERENCES `appointment_statuses` (`id`),
  ADD CONSTRAINT `appointments_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `appointment_details`
--
ALTER TABLE `appointment_details`
  ADD CONSTRAINT `appointment_details_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointment_details_transport_id_foreign` FOREIGN KEY (`transport_id`) REFERENCES `transports` (`id`);

--
-- Constraints for table `patient_avatars`
--
ALTER TABLE `patient_avatars`
  ADD CONSTRAINT `patient_avatars_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `patient_members`
--
ALTER TABLE `patient_members`
  ADD CONSTRAINT `member_id` FOREIGN KEY (`member_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `users_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`);

--
-- Constraints for table `user_avatars`
--
ALTER TABLE `user_avatars`
  ADD CONSTRAINT `user_avatars_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_specializations`
--
ALTER TABLE `user_specializations`
  ADD CONSTRAINT `user_specializations_specialization_id_foreign` FOREIGN KEY (`specialization_id`) REFERENCES `specializations` (`id`),
  ADD CONSTRAINT `user_specializations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_transports`
--
ALTER TABLE `user_transports`
  ADD CONSTRAINT `user_transports_transport_id_foreign` FOREIGN KEY (`transport_id`) REFERENCES `transports` (`id`),
  ADD CONSTRAINT `user_transports_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
