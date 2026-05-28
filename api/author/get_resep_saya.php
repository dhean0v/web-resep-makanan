<?php

session_start();

header("Content-Type: application/json");

include "../koneksi.php";


// ======================
// CEK LOGIN
// ======================

if (!isset($_SESSION['user_id'])) {

    echo json_encode([
        "status" => "error",
        "message" => "Silakan login"
    ]);

    exit;

}

$user_id = $_SESSION['user_id'];


// ======================
// AMBIL RESEP
// ======================

$query = mysqli_query(

    $conn,

    "SELECT *
    FROM resep
    WHERE user_id='$user_id'
    ORDER BY id DESC"

);

$data = [];

while ($row = mysqli_fetch_assoc($query)) {

    $data[] = $row;

}


// ======================
// RESPONSE
// ======================

echo json_encode([

    "status" => "success",
    "data" => $data

]);