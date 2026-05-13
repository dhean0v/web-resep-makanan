<?php
session_start();

// Kalau sudah login, langsung ke halaman utama
if (isset($_SESSION['user_id'])) {
    header("Location: dashboard.php");
    exit();
}

include '../koneksi.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = MD5($_POST['password']); // enkripsi password

    $result = mysqli_query($conn, "SELECT * FROM users WHERE username='$username' AND password='$password'");

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['user_id']  = $row['id'];       // simpan id user
        $_SESSION['username'] = $row['username']; // simpan username
        header("Location: dashboard.php");
        exit();
    } else {
        $error = "Username atau password salah!";
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - ResepKu</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>

<div class="login-wrapper">
    <div class="login-card">

        <div class="login-icon">🍳</div>
        <h1 class="login-title">ResepKu</h1>
        <p class="login-subtitle">Masuk ke akunmu</p>

        <?php if ($error) { ?>
            <div class="alert alert-danger"><?= $error ?></div>
        <?php } ?>

        <form method="POST" action="">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" required placeholder="Masukkan username">
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required placeholder="Masukkan password">
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:12px;">
                Login
            </button>
        </form>

        <p style="text-align:center; margin-top:16px; font-size:0.85rem;">
            Belum punya akun? <a href="register.php">Daftar di sini</a>
        </p>
        <p style="text-align:center; margin-top:8px; font-size:0.85rem;">
            <a href="../Interface.php" style="color:#888;">← Kembali ke Beranda</a>
        </p>

    </div>
</div>

</body>
</html>