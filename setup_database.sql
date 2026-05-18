-- ================================
-- PawonKu – Setup Database
-- Jalankan di phpMyAdmin > SQL
-- ================================

CREATE DATABASE IF NOT EXISTS pawonku
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE pawonku;

-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nama          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  foto_profil   VARCHAR(255) DEFAULT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabel resep
CREATE TABLE IF NOT EXISTS resep (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  judul         VARCHAR(200) NOT NULL,
  deskripsi     TEXT,
  kategori      VARCHAR(50) DEFAULT 'Lainnya',
  waktu_masak   INT DEFAULT 30 COMMENT 'dalam menit',
  porsi         INT DEFAULT 2,
  kesulitan     ENUM('Mudah','Sedang','Sulit') DEFAULT 'Sedang',
  foto          VARCHAR(255) DEFAULT NULL,
  tips_pawon    TEXT,
  status        ENUM('draft','published') DEFAULT 'published',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabel bahan-bahan
CREATE TABLE IF NOT EXISTS bahan (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  resep_id  INT NOT NULL,
  nama      VARCHAR(200) NOT NULL,
  jumlah    VARCHAR(100),
  urutan    INT DEFAULT 0,
  FOREIGN KEY (resep_id) REFERENCES resep(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabel langkah memasak
CREATE TABLE IF NOT EXISTS langkah (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  resep_id    INT NOT NULL,
  nomor       INT NOT NULL,
  judul_step  VARCHAR(100),
  instruksi   TEXT NOT NULL,
  FOREIGN KEY (resep_id) REFERENCES resep(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Sample user (password: pawonku123)
INSERT INTO users (nama, email, password_hash) VALUES
('Chef Demo', 'demo@pawonku.com', '$2y$12$placeholder_hash_ganti_dengan_php')
ON DUPLICATE KEY UPDATE id=id;

-- Sample resep
INSERT INTO resep (user_id, judul, deskripsi, kategori, waktu_masak, porsi, kesulitan, tips_pawon) VALUES
(1, 'Rendang Daging Sapi Minang',
 'Rendang adalah masakan tradisional Minangkabau yang kaya rempah dan memiliki cita rasa yang mendalam.',
 'Daging', 180, 6, 'Sulit',
 'Masak dengan api kecil dan sabar mengaduk agar bumbu meresap sempurna dan tidak gosong.'),
(1, 'Nasi Goreng Kampung Pedas',
 'Nasi goreng dengan bumbu kampung yang sederhana namun kaya rasa, cocok untuk sarapan atau makan malam.',
 'Nasi', 20, 2, 'Mudah',
 'Gunakan nasi yang sudah dingin semalaman agar hasil gorengnya lebih pulen dan tidak menggumpal.');

-- Sample bahan
INSERT INTO bahan (resep_id, nama, jumlah, urutan) VALUES
(1, 'Daging Sapi', '1 kg', 1),
(1, 'Santan Kental', '1 liter', 2),
(1, 'Serai', '3 batang', 3),
(1, 'Daun Jeruk', '5 lembar', 4),
(2, 'Nasi Putih', '2 piring', 1),
(2, 'Telur Ayam', '2 butir', 2),
(2, 'Bawang Putih', '4 siung', 3);

-- Sample langkah
INSERT INTO langkah (resep_id, nomor, judul_step, instruksi) VALUES
(1, 1, 'Siapkan Bumbu', 'Haluskan bawang merah, bawang putih, cabai, jahe, kunyit, dan kemiri hingga benar-benar halus.'),
(1, 2, 'Tumis Bumbu', 'Panaskan minyak, tumis bumbu halus bersama serai, daun jeruk, dan daun salam hingga harum.'),
(1, 3, 'Masak Daging', 'Masukkan daging, aduk rata dengan bumbu. Tuang santan, masak dengan api sedang sambil terus diaduk.'),
(2, 1, 'Siapkan Bahan', 'Iris bawang putih, cabai, dan bawang merah. Kocok lepas telur ayam.'),
(2, 2, 'Goreng Nasi', 'Panaskan minyak, tumis bumbu hingga harum. Masukkan telur, orak-arik. Tambahkan nasi, aduk rata.');
