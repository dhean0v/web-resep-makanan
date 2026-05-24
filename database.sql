-- =============================================
-- DATABASE: pawonku
-- Jalankan script ini di phpMyAdmin atau MySQL CLI
-- =============================================

CREATE DATABASE IF NOT EXISTS pawonku CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pawonku;

-- Tabel User
CREATE TABLE IF NOT EXISTS user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Admin
CREATE TABLE IF NOT EXISTS admin (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Resep
CREATE TABLE IF NOT EXISTS resep (
    id_resep INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    judul_resep VARCHAR(200) NOT NULL,
    deskripsi TEXT,
    gambar VARCHAR(255),
    poin INT DEFAULT 0,
    status_upload ENUM('pending','approved','rejected') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE
);

-- Tabel Bahan
CREATE TABLE IF NOT EXISTS bahan (
    id_bahan INT AUTO_INCREMENT PRIMARY KEY,
    id_resep INT NOT NULL,
    nama_bahan VARCHAR(150) NOT NULL,
    jumlah VARCHAR(100),
    satuan VARCHAR(50),
    FOREIGN KEY (id_resep) REFERENCES resep(id_resep) ON DELETE CASCADE
);

-- Tabel Langkah Memasak
CREATE TABLE IF NOT EXISTS langkah_memasak (
    id_langkah INT AUTO_INCREMENT PRIMARY KEY,
    id_resep INT NOT NULL,
    urutan INT NOT NULL,
    deskripsi_langkah TEXT NOT NULL,
    waktu_memasak VARCHAR(50),
    FOREIGN KEY (id_resep) REFERENCES resep(id_resep) ON DELETE CASCADE
);

-- Tabel Catatan Admin (log moderasi)
CREATE TABLE IF NOT EXISTS catatan_admin (
    id_catatan INT AUTO_INCREMENT PRIMARY KEY,
    id_admin INT NOT NULL,
    id_resep INT NOT NULL,
    aksi ENUM('approved','rejected','deleted') NOT NULL,
    catatan TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_admin) REFERENCES admin(id_admin),
    FOREIGN KEY (id_resep) REFERENCES resep(id_resep) ON DELETE CASCADE
);

-- Insert admin default (password: admin123)
INSERT INTO admin (nama, email, password) VALUES
('Super Admin', 'admin@pawonku.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert user contoh (password: user123)
INSERT INTO user (nama, email, password) VALUES
('Budi Santoso', 'budi@gmail.com', '$2y$10$TKh8H1.PvD/BI0YJBbKkbOnMT2/EbJ0hEaYGjn7C.FmVHFVOSaRea');
