<?php
session_start();

// Kalau sudah login, langsung ke halaman utama
if (isset($_SESSION['user_id'])) {
    header("Location: dashboard.php");
    exit();
}

include '../koneksi.php';

$error   = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $email    = $_POST['email'];
    $password = MD5($_POST['password']); // enkripsi password

    // Cek username atau email sudah dipakai belum
    $cek = mysqli_query($conn, "SELECT * FROM users WHERE username='$username' OR email='$email'");

    if (mysqli_num_rows($cek) > 0) {
        $error = "Username atau email sudah digunakan!";
    } else {
        $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";

        if (mysqli_query($conn, $sql)) {
            $success = "Akun berhasil dibuat! Silakan login.";
        } else {
            $error = "Gagal membuat akun, coba lagi.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar - ResepKu</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>

<div class="login-wrapper">
    <div class="login-card">

        <div class="login-icon">👤</div>
        <h1 class="login-title">Daftar Akun</h1>
        <p class="login-subtitle">Buat akun untuk mulai berbagi resep</p>

        <?php if ($error) { ?>
            <div class="alert alert-danger"><?= $error ?></div>
        <?php } ?>

        <?php if ($success) { ?>
            <div class="alert alert-success">
                <?= $success ?>
                <br><a href="login_user.php">Klik di sini untuk login</a>
            </div>
        <?php } ?>

        <form method="POST" action="">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" required placeholder="Masukkan username">
            </div>

            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" required placeholder="Masukkan email">
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required placeholder="Masukkan password">
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:12px;">
                Daftar Sekarang
            </button>
        </form>

        <p style="text-align:center; margin-top:16px; font-size:0.85rem;">
            Sudah punya akun? <a href="login_user.php">Login di sini</a>
        </p>
        <p style="text-align:center; margin-top:8px; font-size:0.85rem;">
            <a href="../Interface.php" style="color:#888;">← Kembali ke Beranda</a>
        </p>

    </div>
</div>

</body>
</html>