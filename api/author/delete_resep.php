<?php

session_start();

header("Content-Type: application/json");

include "../koneksi.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "status"  => "error",
        "message" => "Silakan login"
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];
$id      = $_GET['id'];

// Cek resep milik user ini
$query = mysqli_query(
    $conn,
    "SELECT * FROM resep
     WHERE id='$id'
     AND user_id='$user_id'"
);

$resep = mysqli_fetch_assoc($query);

if (!$resep) {
    echo json_encode([
        "status"  => "error",
        "message" => "Resep tidak ditemukan"
    ]);
    exit;
}

// Hapus foto dari server
if ($resep['foto']) {
    $path = "../../uploads/" . $resep['foto'];
    if (file_exists($path)) unlink($path);
}

// Hapus resep dari database
$delete = mysqli_query(
    $conn,
    "DELETE FROM resep WHERE id='$id' AND user_id='$user_id'"
);

if ($delete) {
    echo json_encode([
        "status"  => "success",
        "message" => "Resep berhasil dihapus"
    ]);
} else {
    echo json_encode([
        "status"  => "error",
        "message" => "Gagal menghapus resep"
    ]);
}   