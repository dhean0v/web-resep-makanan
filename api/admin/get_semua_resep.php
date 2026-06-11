<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(["status" => "error", "message" => "Akses ditolak"]);
    exit;
}

include "../koneksi.php";

$query = mysqli_query(
    $conn,
    "SELECT resep.*, users.nama
     FROM resep
     LEFT JOIN users ON resep.user_id = users.id
     ORDER BY resep.id DESC"
);

$data = [];
while ($row = mysqli_fetch_assoc($query)) {
    $data[] = $row;
}

echo json_encode(["status" => "success", "data" => $data]);