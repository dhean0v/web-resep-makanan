<?php
error_reporting(0);
ini_set('display_errors', 0);
session_start();
header("Content-Type: application/json");
include "../koneksi.php";

$data = json_decode(file_get_contents("php://input"), true);
$email    = mysqli_real_escape_string($conn, trim($data['email'] ?? ''));
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Email & password wajib diisi!"]);
    exit;
}

$query = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");
$user  = mysqli_fetch_assoc($query);

if ($user && password_verify($password, $user['password_hash'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['nama']    = $user['nama'];
    $_SESSION['role']    = $user['role'];

    echo json_encode([
        "status"  => "success",
        "message" => "Login berhasil!",
        "role"    => $user['role']
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Email atau password salah!"]);
}