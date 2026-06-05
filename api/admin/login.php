<?php

session_start();

header("Content-Type: application/json");

include "../koneksi.php";

$data =
json_decode(
    file_get_contents("php://input"),
    true
);

$username =
$data['username'];

$password =
$data['password'];

$query =
mysqli_query(

    $conn,

    "SELECT * FROM admin
    WHERE username='$username'
    AND password='$password'"

);

$admin =
mysqli_fetch_assoc(
    $query
);

if ($admin) {

    $_SESSION['admin_id'] =
    $admin['id'];

    echo json_encode([

        "status" => "success",
    ]);

} else {

    echo json_encode([

        "status" => "error",

        "message" =>
        "Username atau password salah"

    ]);

}   