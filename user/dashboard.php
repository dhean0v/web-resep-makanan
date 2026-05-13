<?php
session_start();

// Belum login → tendang ke login
if (!isset($_SESSION['user_id'])) {
    header("Location: login_user.php");
    exit();
}

include '../koneksi.php';

$user_id  = $_SESSION['user_id'];
$username = $_SESSION['username'];

// Ambil HANYA resep milik user yang sedang login
$result = mysqli_query($conn, "
    SELECT resep.*, kategori.nama
    FROM resep
    JOIN kategori ON resep.kategori_id = kategori.id
    WHERE resep.user_id = '$user_id'
    ORDER BY resep.created_at DESC
");

$total_resep = mysqli_num_rows($result);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - <?= $username ?></title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar">
    <a class="navbar-brand" href="../Interface.php">🍳 ResepKu</a>
    <ul class="navbar-menu">
        <!-- ✅ PERBAIKAN 1: Tambah link ke beranda -->
        <li><a href="../Interface.php">Beranda</a></li>
        <li><a href="dashboard.php">Dashboard</a></li>
        <li><a href="logout_user.php" style="color:#e74c3c;">Logout</a></li>
    </ul>
</nav>

<!-- PROFIL USER -->
<div class="hero" style="padding:40px 20px;">
    <div style="font-size:4rem;">👤</div>
    <h1 style="font-size:1.8rem; margin-top:12px;"><?= $username ?></h1>
    <p><?= $total_resep ?> Resep diunggah</p>
</div>

<div class="container">

    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
        <h2 class="section-title">Resep Saya</h2>
        <a href="tambah_user.php" class="btn btn-primary">+ Tambah Resep</a>
    </div>

    <?php if ($total_resep > 0) { ?>

        <!-- ✅ PERBAIKAN 2: Ganti tabel jadi card grid — lebih modern & ada foto -->
        <div class="card-grid">
            <?php while ($row = mysqli_fetch_assoc($result)) { ?>
            <div class="card">

                <!-- ✅ PERBAIKAN 3: Tampilkan foto resep -->
                <?php if (!empty($row['foto'])) { ?>
                    <!-- Kalau ada foto → tampilkan -->
                    <img src="../uploads/<?= $row['foto'] ?>" class="card-img" alt="<?= $row['judul'] ?>">
                <?php } else { ?>
                    <!-- Kalau tidak ada foto → tampilkan emoji -->
                    <div class="card-img-placeholder">🍳</div>
                <?php } ?>

                <div class="card-body">

                    <!-- Badge kategori -->
                    <span class="card-badge"><?= $row['nama'] ?></span>

                    <!-- Judul resep -->
                    <h3 class="card-title"><?= $row['judul'] ?></h3>

                    <!-- Deskripsi singkat -->
                    <p class="card-desc"><?= $row['deskripsi'] ?></p>

                    <!-- Bahan & Langkah bisa dibuka/tutup -->
                    <a href="../detail.php?id=<?= $row['id'] ?>" class="card-link">
                        Lihat Resep →
                    </a>

                    <!-- ✅ PERBAIKAN 4: Format tanggal lebih rapi -->
                    <p style="font-size:0.78rem; color:#aaa; margin-bottom:12px;">
                        📅 <?= date('d M Y', strtotime($row['created_at'])) ?>
                    </p>

                    <!-- Tombol Edit & Hapus -->
                    <div style="display:flex; gap:8px;">
                        <a href="update_user.php?id=<?= $row['id'] ?>"
                           class="btn btn-outline"
                           style="padding:6px 14px; font-size:0.8rem; flex:1; text-align:center;">
                            ✏️ Edit
                        </a>
                        <a href="delete_user.php?id=<?= $row['id'] ?>"
                           class="btn btn-danger"
                           style="padding:6px 14px; font-size:0.8rem; flex:1; text-align:center;"
                           onclick="return confirm('Yakin mau hapus resep ini?')">
                            🗑️ Hapus
                        </a>
                    </div>

                </div>
            </div>
            <?php } ?>
        </div>

    <?php } else { ?>

        <!-- Tampilan kalau belum punya resep -->
        <div style="text-align:center; padding:60px 20px; background:white; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <div style="font-size:4rem; margin-bottom:16px;">🍳</div>
            <h3 style="color:#888; margin-bottom:12px;">Kamu belum punya resep nih!</h3>
            <p style="color:#aaa; margin-bottom:24px;">Yuk mulai bagikan resep favoritmu</p>
            <a href="tambah_user.php" class="btn btn-primary">+ Tambah Resep Pertama</a>
        </div>

    <?php } ?>

</div>

<footer>
    <p>&copy; 2025 <span>ResepKu</span>. All rights reserved.</p>
</footer>

</body>
</html>