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


// ======================
// AMBIL DATA
// ======================

$user_id = $_SESSION['user_id'];

$judul = mysqli_real_escape_string(
    $conn,
    $_POST['judul'] ?? ''
);

$deskripsi = mysqli_real_escape_string(
    $conn,
    $_POST['deskripsi'] ?? ''
);

$kategori = mysqli_real_escape_string(
    $conn,
    $_POST['kategori'] ?? ''
);

$youtube_url = mysqli_real_escape_string(
    $conn,
    $_POST['youtube_url'] ?? ''
);


// ======================
// ARRAY BAHAN
// ======================

$nama_bahan =
$_POST['nama_bahan'] ?? [];

$jumlah_bahan =
$_POST['jumlah_bahan'] ?? [];


// ======================
// ARRAY LANGKAH
// ======================

$langkah =
$_POST['langkah'] ?? [];


// ======================
// VALIDASI
// ======================

if (

    empty($judul) ||
    empty($deskripsi) ||
    empty($kategori)

) {

    echo json_encode([

        "status" => "error",

        "message" => "Data belum lengkap"

    ]);

    exit;

}


// ======================
// UPLOAD FOTO
// ======================

$foto = null;

if (

    isset($_FILES['foto']) &&
    $_FILES['foto']['error'] === 0

) {

    $folder = "../../uploads/";


    // BUAT FOLDER
    if (!file_exists($folder)) {

        mkdir($folder, 0777, true);

    }


    $namaFile =

    time() . "_" .

    basename($_FILES['foto']['name']);


    $path =
    $folder . $namaFile;


    $upload = move_uploaded_file(

        $_FILES['foto']['tmp_name'],

        $path

    );


    if ($upload) {

        $foto = $namaFile;

    }

}


// ======================
// INSERT RESEP
// ======================

$query = mysqli_query(

    $conn,

    "INSERT INTO resep
    (
        user_id,
        judul,
        deskripsi,
        kategori,
        foto,
        youtube_url,
        status
    )

    VALUES
    (
        '$user_id',
        '$judul',
        '$deskripsi',
        '$kategori',
        '$foto',
        '$youtube_url',
        'pending'
    )"

);


// ======================
// GAGAL INSERT
// ======================

if (!$query) {

    echo json_encode([

        "status" => "error",

        "message" => mysqli_error($conn)

    ]);

    exit;

}


// ======================
// AMBIL ID RESEP
// ======================

$resep_id =
mysqli_insert_id($conn);


// ======================
// INSERT BAHAN
// ======================

foreach ($nama_bahan as $index => $nama) {

    $nama = mysqli_real_escape_string(
        $conn,
        $nama
    );

    $jumlah = mysqli_real_escape_string(
        $conn,
        $jumlah_bahan[$index] ?? ''
    );

    $urutan = $index + 1;


    mysqli_query(

        $conn,

        "INSERT INTO bahan
        (
            resep_id,
            nama,
            jumlah,
            urutan
        )

        VALUES
        (
            '$resep_id',
            '$nama',
            '$jumlah',
            '$urutan'
        )"

    );

}


// ======================
// INSERT LANGKAH
// ======================

foreach ($langkah as $index => $item) {

    $instruksi = mysqli_real_escape_string(
        $conn,
        $item
    );

    $nomor = $index + 1;


    mysqli_query(

        $conn,

        "INSERT INTO langkah
        (
            resep_id,
            nomor,
            instruksi
        )

        VALUES
        (
            '$resep_id',
            '$nomor',
            '$instruksi'
        )"

    );

}


// ======================
// RESPONSE
// ======================

echo json_encode([

    "status" => "success",

    "message" =>
    "Resep berhasil dikirim dan menunggu persetujuan admin"

]);

?>