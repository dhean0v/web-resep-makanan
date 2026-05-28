<?php

session_start();

header("Content-Type: application/json");

include "../koneksi.php";


// BELUM LOGIN
if (!isset($_SESSION['user_id'])) {

    echo json_encode([

        "status" => "error"

    ]);

    exit;

}


// AMBIL USER
$id = $_SESSION['user_id'];

$query = mysqli_query(

    $conn,

    "SELECT *
    FROM users
    WHERE id='$id'"

);

$user = mysqli_fetch_assoc($query);


// RESPONSE
echo json_encode([

    "status" => "success",

    "user" => $user

]);