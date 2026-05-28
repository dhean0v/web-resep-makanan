<?php

header("Content-Type: application/json");

include "../koneksi.php";


// ======================
// AMBIL JSON
// ======================

$data = json_decode(

    file_get_contents("php://input"),

    true

);


// ======================
// DATA
// ======================

$nama = mysqli_real_escape_string(

    $conn,

    trim($data['nama'] ?? '')

);

$email = mysqli_real_escape_string(

    $conn,

    trim($data['email'] ?? '')

);

$password = $data['password'] ?? '';


// ======================
// VALIDASI
// ======================

if (

    empty($nama) ||
    empty($email) ||
    empty($password)

) {

    echo json_encode([

        "status" => "error",

        "message" => "Data belum lengkap"

    ]);

    exit;

}


// ======================
// CEK EMAIL
// ======================

$cek = mysqli_query(

    $conn,

    "SELECT id
    FROM users
    WHERE email='$email'"

);


if (mysqli_num_rows($cek) > 0) {

    echo json_encode([

        "status" => "error",

        "message" => "Email sudah digunakan"

    ]);

    exit;

}


// ======================
// HASH PASSWORD
// ======================

$passwordHash = password_hash(

    $password,

    PASSWORD_DEFAULT

);


// ======================
// INSERT USER
// ======================

$query = mysqli_query(

    $conn,

    "INSERT INTO users
    (
        nama,
        email,
        password_hash
    )

    VALUES
    (
        '$nama',
        '$email',
        '$passwordHash'
    )"

);


// ======================
// RESPONSE
// ======================

if ($query) {

    echo json_encode([

        "status" => "success",

        "message" => "Register berhasil"

    ]);

} else {

    echo json_encode([

        "status" => "error",

        "message" => mysqli_error($conn)

    ]);

}