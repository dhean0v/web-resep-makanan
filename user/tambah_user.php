<?php
session_start();

// Belum login → tendang ke login
if (!isset($_SESSION['user_id'])) {
    header("Location: login_user.php");
    exit();
}

include '../koneksi.php';

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $judul       = $_POST['judul'];
    $kategori_id = $_POST['kategori_id'];
    $deskripsi   = $_POST['deskripsi'];
    $bahan       = $_POST['bahan'];
    $langkah     = $_POST['langkah'];
    $foto        = '';

    // Proses upload foto
    if (!empty($_FILES['foto']['name'])) {
        $nama_foto = time() . '_' . $_FILES['foto']['name'];
        move_uploaded_file($_FILES['foto']['tmp_name'], '../uploads/' . $nama_foto);
        $foto = $nama_foto;
    }

    // Simpan resep + user_id pemiliknya
    $sql = "INSERT INTO resep (user_id, judul, kategori_id, deskripsi, bahan, langkah, foto)
            VALUES ('$user_id', '$judul', '$kategori_id', '$deskripsi', '$bahan', '$langkah', '$foto')";

    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Resep berhasil ditambahkan!'); window.location='dashboard.php';</script>";
    } else {
        echo "<script>alert('Gagal menambahkan resep!');</script>";
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Resep - ResepKu</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>

<nav class="navbar">
    <a class="navbar-brand" href="dashboard.php">🍳 ResepKu</a>
    <ul class="navbar-menu">
        <li><a href="dashboard.php">Dashboard</a></li>
        <li><a href="logout_user.php" style="color:#e74c3c;">Logout</a></li>
    </ul>
</nav>

<div class="container">
    <div class="form-card">
        <h2 class="form-title">Tambah Resep Baru</h2>

        <form method="POST" action="" enctype="multipart/form-data">

            <div class="form-group">
                <label>Nama Makanan</label>
                <input type="text" name="judul" required placeholder="Contoh: Nasi Goreng Spesial">
            </div>

            <div class="form-group">
                <label>Kategori</label>
                <select name="kategori_id" required>
                    <option value="">Pilih Kategori</option>
                    <?php
                    $kategori_result = mysqli_query($conn, "SELECT * FROM kategori");
                    while ($k = mysqli_fetch_assoc($kategori_result)) {
                        echo "<option value='{$k['id']}'>{$k['nama']}</option>";
                    }
                    ?>
                </select>
            </div>

            <div class="form-group">
                <label>Deskripsi</label>
                <textarea name="deskripsi" required placeholder="Ceritakan sedikit tentang resep ini..."></textarea>
            </div>

            <div class="form-group">
                <label>Bahan-bahan</label>
                <textarea name="bahan" required placeholder="Pisahkan tiap bahan dengan enter&#10;Contoh:&#10;2 piring nasi putih&#10;2 butir telur"></textarea>
            </div>

            <div class="form-group">
                <label>Langkah Memasak</label>
                <textarea name="langkah" required placeholder="Pisahkan tiap langkah dengan enter&#10;Contoh:&#10;1. Panaskan minyak&#10;2. Tumis bawang"></textarea>
            </div>

            <div class="form-group">
                <label>Foto Resep</label>
                <input type="file" name="foto" accept="image/*">
            </div>

            <div style="display:flex; gap:12px; margin-top:8px;">
                <button type="submit" class="btn btn-primary">Simpan Resep</button>
                <a href="dashboard.php" class="btn btn-secondary">Batal</a>
            </div>

        </form>
    </div>
</div>

<footer>
    <p>&copy; 2025 <span>ResepKu</span>. All rights reserved.</p>
</footer>

</body>
</html>