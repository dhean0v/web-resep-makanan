<?php

session_start();

if (!isset($_SESSION['admin_id'])) {

    echo json_encode([
        "status" => "error",
        "message" => "Akses ditolak"
    ]);

    exit;

}

header("Content-Type: application/json");

include "../koneksi.php";

if(!isset($_SESSION['admin_id'])){

    echo json_encode([
        "status" => "error"
    ]);

    exit;
}

$query = mysqli_query(

    $conn,

    "SELECT

        resep.*,
        users.nama

    FROM resep

    LEFT JOIN users
    ON resep.user_id = users.id

    ORDER BY resep.id DESC"

);

$data = [];

while($row = mysqli_fetch_assoc($query)){

    $data[] = $row;
}

echo json_encode([
    "status" => "success",
    "data" => $data
]);