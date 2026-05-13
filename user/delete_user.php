<?php
session_start();

// Belum login → tendang ke login
if (!isset($_SESSION['user_id'])) {
    header("Location: login_user.php");
    exit();
}

include '../koneksi.php';

$id      = $_GET['id'] ?? null;
$user_id = $_SESSION['user_id'];

if (!$id) {
    header("Location: dashboard.php");
    exit();
}

// Hapus HANYA kalau id DAN user_id cocok — tidak bisa hapus resep orang lain!
$sql = "DELETE FROM resep WHERE id='$id' AND user_id='$user_id'";

if (mysqli_query($conn, $sql)) {
    if (mysqli_affected_rows($conn) > 0) {
        echo "<script>alert('Resep berhasil dihapus!'); window.location='dashboard.php';</script>";
    } else {
        // Query jalan tapi tidak ada yang kehapus = bukan miliknya
        echo "<script>alert('Kamu tidak punya akses hapus resep ini!'); window.location='dashboard.php';</script>";
    }
} else {
    echo "<script>alert('Gagal menghapus!'); window.location='dashboard.php';</script>";
}
?>