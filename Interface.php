<?php
session_start(); // ✅ PERBAIKAN 1: Tambah session_start() — sebelumnya tidak ada, jadi navbar login/logout tidak berfungsi
include 'koneksi.php';

$result = mysqli_query($conn, "
    SELECT resep.*, kategori.nama
    FROM resep
    JOIN kategori ON resep.kategori_id = kategori.id
    ORDER BY resep.created_at DESC
");
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResepKu - Resep Makanan Lezat</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar">
    <a class="navbar-brand" href="Interface.php">🍳 ResepKu</a>
    <ul class="navbar-menu">
        <?php if (isset($_SESSION['user_id'])) { ?>
            <!-- Sudah login → tampil nama user, dashboard, logout -->
            <li><span style="color:#888; font-size:0.9rem;">Halo, <?= $_SESSION['username'] ?>!</span></li>
            <li><a href="user/dashboard.php">Dashboard</a></li>
            <li><a href="user/logout_user.php" style="color:#e74c3c;">Logout</a></li>
        <?php } else { ?>
            <!-- Belum login → tampil login & daftar -->
            <li><a href="user/login_user.php">Login</a></li>
            <li><a href="user/register.php">Daftar</a></li>
        <?php } ?>
    </ul>
</nav>

<!-- HERO SECTION -->
<div class="hero">
    <h1>Resep Makanan Lezat</h1>
    <p>Temukan dan bagikan resep favoritmu bersama keluarga</p>
</div>

<!-- KONTEN UTAMA -->
<div class="container">

    <!-- Judul section + tombol tambah resep -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h2 class="section-title">Semua Resep</h2>

        <?php if (isset($_SESSION['user_id'])) { ?>
            <!-- ✅ Sudah login → langsung ke form tambah -->
            <a href="user/tambah_user.php" class="btn btn-primary">+ Tambah Resep</a>
        <?php } else { ?>
            <!-- ✅ Belum login → ke halaman login dulu -->
            <a href="user/login_user.php" class="btn btn-primary">+ Tambah Resep</a>
        <?php } ?>
    </div>

    <!-- ✅ PERBAIKAN 2: Ubah dari TABEL jadi CARD GRID — lebih modern & ada fotonya -->
    <?php if (mysqli_num_rows($result) > 0) { ?>
        <div class="card-grid">
            <?php while ($row = mysqli_fetch_assoc($result)) { ?>
            <div class="card">

                <!-- ✅ PERBAIKAN 3: Tambah foto resep -->
                <?php if (!empty($row['foto'])) { ?>
                    <!-- Kalau ada foto → tampilkan gambarnya -->
                    <!-- "uploads/" + nama file yang tersimpan di database -->
                    <img src="uploads/<?= $row['foto'] ?>" class="card-img" alt="<?= $row['judul'] ?>">
                <?php } else { ?>
                    <!-- Kalau tidak ada foto → tampilkan emoji sebagai pengganti -->
                    <div class="card-img-placeholder">🍳</div>
                <?php } ?>

                <!-- Info resep di dalam card -->
                <div class="card-body">

                    <!-- Badge kategori -->
                    <span class="card-badge"><?= $row['nama'] ?></span>

                    <!-- Judul resep -->
                    <h3 class="card-title"><?= $row['judul'] ?></h3>

                    <!-- Deskripsi singkat — otomatis terpotong 2 baris oleh CSS -->
                    <p class="card-desc"><?= $row['deskripsi'] ?></p>

                    <!-- ✅ PERBAIKAN 4: Tambah info bahan & langkah dalam bentuk accordion/toggle -->
                    <a href="detail.php?id=<?= $row['id'] ?>" class="card-link">
                        Lihat Resep →
                    </a>

                    <!-- Tanggal upload -->
                    <p style="font-size:0.78rem; color:#aaa; margin-top:8px;">
                        📅 <?= date('d M Y', strtotime($row['created_at'])) ?>
                        <!-- ✅ PERBAIKAN 5: Format tanggal lebih rapi, dari "2026-04-29 13:04:47" jadi "29 Apr 2026" -->
                    </p>

                </div>
            </div>
            <?php } ?>
        </div>

    <?php } else { ?>
        <!-- Tampilan kalau belum ada resep sama sekali -->
        <div style="text-align:center; padding:60px 20px; background:white; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <div style="font-size:4rem; margin-bottom:16px;">🍳</div>
            <h3 style="color:#888; margin-bottom:12px;">Belum ada resep nih!</h3>
            <p style="color:#aaa; margin-bottom:24px;">Jadilah yang pertama berbagi resep</p>
            <a href="user/login_user.php" class="btn btn-primary">+ Tambah Resep Pertama</a>
        </div>
    <?php } ?>

</div>

<!-- FOOTER -->
<footer>
    <p>&copy; 2025 <span>ResepKu</span>. All rights reserved.</p>
    <!-- <p><a href="admin/login.php" style="color:#888; font-size:0.8rem;">Admin Login</a></p> -->
</footer>

</body>
</html>