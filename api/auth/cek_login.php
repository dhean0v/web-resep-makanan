<?php
session_start();
header("Content-Type: application/json");
include "../koneksi.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Belum login"]);
    exit;
}

$query = mysqli_query($conn, "SELECT id, nama, email, role FROM users WHERE id='".$_SESSION['user_id']."'");
$user = mysqli_fetch_assoc($query);

echo json_encode([
    "status" => "success",
    "user"   => $user
]);
?>