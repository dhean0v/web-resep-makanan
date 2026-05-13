<?php
session_start();
include 'koneksi.php';

// Ambil ID dari URL
$id = $_GET['id'] ?? null;

// Kalau tidak ada ID → balik ke beranda
if (!$id) {
    header("Location: Interface.php");
    exit();
}

// Ambil data 1 resep berdasarkan ID
$result = mysqli_query($conn, "
    SELECT resep.*, kategori.nama AS nama_kategori
    FROM resep
    JOIN kategori ON resep.kategori_id = kategori.id
    WHERE resep.id = '$id'
");

$row = mysqli_fetch_assoc($result);

// Kalau resep tidak ditemukan → balik ke beranda
if (!$row) {
    header("Location: Interface.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $row['judul'] ?> - ResepKu</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar">
    <a class="navbar-brand" href="Interface.php">🍳 ResepKu</a>
    <ul class="navbar-menu">
        <?php if (isset($_SESSION['user_id'])) { ?>
            <li><a href="user/dashboard.php">Dashboard</a></li>
            <li><a href="user/logout_user.php" style="color:#e74c3c;">Logout</a></li>
        <?php } else { ?>
            <li><a href="user/login_user.php">Login</a></li>
            <li><a href="user/register.php">Daftar</a></li>
        <?php } ?>
    </ul>
</nav>

<div class="container">
    <!-- HEADER RESEP -->
    <div class="detail-header">

        <!-- Foto resep -->
        <?php if (!empty($row['foto'])) { ?>
            <img src="uploads/<?= $row['foto'] ?>" class="detail-img" alt="<?= $row['judul'] ?>">
        <?php } else { ?>
            <div style="width:100%; height:300px; background:linear-gradient(135deg,#f5ebe0,#e8d5b7); display:flex; align-items:center; justify-content:center; font-size:6rem;">
                🍳
            </div>
        <?php } ?>

        <!-- Info dasar resep -->
        <div class="detail-info">
            <span class="badge"><?= $row['nama_kategori'] ?></span>
            <h1 class="detail-title"><?= $row['judul'] ?></h1>
            <p class="detail-desc"><?= $row['deskripsi'] ?></p>
            <p style="font-size:0.85rem; color:#aaa;">
                📅 <?= date('d M Y', strtotime($row['created_at'])) ?>
            </p>
        </div>
    </div>

    <!-- BAHAN-BAHAN -->
    <div class="detail-box">
        <h3>🛒 Bahan-bahan</h3>
        <p><?= nl2br($row['bahan']) ?></p>
    </div>

    <!-- LANGKAH MEMASAK -->
    <div class="detail-box">
        <h3>👨‍🍳 Cara Memasak</h3>
        <p><?= nl2br($row['langkah']) ?></p>
    </div>

    <!-- Wrapper semua tombol -->
    <div style="margin-top:20px; display:flex; justify-content:space-between; align-items:center;">

        <!-- Tombol edit/hapus di KANAN -->
        <?php if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == $row['user_id']) { ?>
            <a href="user/dashboard.php" style="color:#c0392b; font-weight:700; text-decoration:none;">
                ← Kembali ke Beranda
            </a>
            <div style="display:flex; gap:12px;">
                <a href="user/edit_user.php?id=<?= $row['id'] ?>" class="btn btn-outline">✏️ Edit Resep</a>
                <a href="user/delete_user.php?id=<?= $row['id'] ?>" class="btn btn-danger"
                onclick="return confirm('Yakin mau hapus?')">🗑️ Hapus</a>
            </div>

        <?php } elseif (isset($_SESSION['username']) && !isset($_SESSION['user_id'])) { ?>
            <a href="admin/admin.php" style="color:#c0392b; font-weight:700; text-decoration:none;">
                ← Kembali ke Beranda
            </a>
            <div style="display:flex; gap:12px;">
                <a href="admin/update.php?id=<?= $row['id'] ?>" class="btn btn-outline">✏️ Edit Resep</a>
                <a href="admin/delete.php?id=<?= $row['id'] ?>" class="btn btn-danger"
                onclick="return confirm('Yakin mau hapus?')">🗑️ Hapus</a>
            </div>

        <?php } else { ?>
            <a href="Interface.php" style="color:#c0392b; font-weight:700; text-decoration:none;">
                ← Kembali ke Beranda
            </a>
            <div></div>
        <?php } ?>

    </div>
</div>

<footer>
    <p>&copy; 2025 <span>ResepKu</span>. All rights reserved.</p>
</footer>

</body>
</html> 