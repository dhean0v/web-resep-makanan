<?php

header("Content-Type: application/json");

include "../koneksi.php";

if (!isset($_GET['id'])) {

    echo json_encode([
        "status" => "error",
        "message" => "ID tidak ditemukan"
    ]);

    exit;
}

$id = $_GET['id'];


// ======================
// RESEP
// ======================

$query = mysqli_query(

    $conn,

    "SELECT
        resep.*,
        users.nama AS author
    FROM resep
    LEFT JOIN users
        ON resep.user_id = users.id
    WHERE resep.id = '$id'
    LIMIT 1"

);

$resep = mysqli_fetch_assoc($query);

if (!$resep) {

    echo json_encode([
        "status" => "error",
        "message" => "Resep tidak ditemukan"
    ]);

    exit;
}


// ======================
// BAHAN
// ======================

$bahanQuery = mysqli_query(

    $conn,

    "SELECT *
    FROM bahan
    WHERE resep_id='$id'
    ORDER BY urutan ASC"

);

$bahan = [];

while ($row = mysqli_fetch_assoc($bahanQuery)) {

    $bahan[] = $row;

}


// ======================
// LANGKAH
// ======================

$langkahQuery = mysqli_query(

    $conn,

    "SELECT *
    FROM langkah
    WHERE resep_id='$id'
    ORDER BY nomor ASC"

);

$langkah = [];

while ($row = mysqli_fetch_assoc($langkahQuery)) {

    $langkah[] = $row;

}


// ======================
// GABUNGKAN
// ======================

$resep['bahan'] = $bahan;
$resep['langkah'] = $langkah;


// ======================
// RESPONSE
// ======================

echo json_encode([

    "status" => "success",
    "data" => $resep

]);