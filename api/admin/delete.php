<?php
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(["status" => "error", "message" => "Akses ditolak"]);
    exit;
}

include "../koneksi.php";

$id = $_GET['id'];

$query = mysqli_query(
    $conn,
    "DELETE FROM resep WHERE id='$id'"
);

if ($query) {
    echo json_encode(["status" => "success", "message" => "Resep berhasil dihapus"]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal menghapus resep"]);
}