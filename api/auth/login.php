<?php

session_start();

header("Content-Type: application/json");

include "../koneksi.php";


// ==============================
// CEK METHOD
// ==============================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    echo json_encode([

        "status"  => "error",
        "message" => "Method tidak diizinkan"

    ]);

    exit;
}


// ==============================
// AMBIL DATA JSON
// ==============================

$data = json_decode(
    file_get_contents("php://input"),
    true
);


// ==============================
// VALIDASI INPUT
// ==============================

if (

    empty($data['email']) ||
    empty($data['password'])

) {

    echo json_encode([

        "status"  => "error",
        "message" => "Email dan password wajib diisi"

    ]);

    exit;
}


// ==============================
// AMBIL INPUT
// ==============================

$email    = trim($data['email']);
$password = trim($data['password']);


// ==============================
// QUERY USER
// ==============================

$query = mysqli_query(

    $conn,

    "SELECT * FROM users
    WHERE email = '$email'
    LIMIT 1"

);


// ==============================
// CEK QUERY
// ==============================

if (!$query) {

    echo json_encode([

        "status"  => "error",
        "message" => "Query database gagal"

    ]);

    exit;
}


// ==============================
// AMBIL DATA USER
// ==============================

$user = mysqli_fetch_assoc($query);


// ==============================
// LOGIN BERHASIL
// ==============================

if (

    $user &&
    password_verify(
        $password,
        $user['password_hash']
    )

) {

    // SESSION
    $_SESSION['login'] = true;

    $_SESSION['user_id'] =
    $user['id'];

    $_SESSION['nama'] =
    $user['nama'];

    $_SESSION['email'] =
    $user['email'];


    echo json_encode([

        "status"  => "success",

        "message" => "Login berhasil",

        "user" => [

            "id"    => $user['id'],
            "nama"  => $user['nama'],
            "email" => $user['email']

        ]

    ]);

} else {

    // LOGIN GAGAL
    echo json_encode([

        "status"  => "error",

        "message" => "Email atau password salah"

    ]);

}
?>