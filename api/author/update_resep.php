<?php

session_start();

header("Content-Type: application/json");

include "../koneksi.php";


// ======================
// CEK LOGIN
// ======================

if (!isset($_SESSION['user_id'])) {

    echo json_encode([
        "status"  => "error",
        "message" => "Harus login"
    ]);

    exit;

}


$user_id = $_SESSION['user_id'];

$id = mysqli_real_escape_string(
    $conn,
    $_GET['id'] ?? ''
);


// ======================
// DATA
// ======================

$judul = mysqli_real_escape_string(
    $conn,
    $_POST['judul'] ?? ''
);

$kategori = mysqli_real_escape_string(
    $conn,
    $_POST['kategori'] ?? ''
);

$deskripsi = mysqli_real_escape_string(
    $conn,
    $_POST['deskripsi'] ?? ''
);

$youtube_url = mysqli_real_escape_string(
    $conn,
    $_POST['youtube_url'] ?? ''
);


// ARRAY BAHAN
$nama_bahan =
$_POST['nama_bahan'] ?? [];

$jumlah_bahan =
$_POST['jumlah_bahan'] ?? [];


// ARRAY LANGKAH
$langkah =
$_POST['langkah'] ?? [];


// ======================
// CEK RESEP
// ======================

$cek = mysqli_query(

    $conn,

    "SELECT foto
    FROM resep
    WHERE id='$id'
    AND user_id='$user_id'"

);

$resepLama =
mysqli_fetch_assoc($cek);


if (!$resepLama) {

    echo json_encode([

        "status"  => "error",

        "message" => "Resep tidak ditemukan"

    ]);

    exit;

}


// ======================
// FOTO LAMA
// ======================

$foto = $resepLama['foto'];


// ======================
// UPLOAD FOTO BARU
// ======================

if (
    isset($_FILES['foto']) &&
    $_FILES['foto']['error'] === 0
) {

    $folder = "../../uploads/";

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

        // HAPUS FOTO LAMA
        if (!empty($resepLama['foto'])) {

            $pathLama =
            "../../uploads/" .
            $resepLama['foto'];

            if (file_exists($pathLama)) {

                unlink($pathLama);

            }

        }

    }

}


// ======================
// UPDATE RESEP
// ======================

$query = mysqli_query(

    $conn,

    "UPDATE resep SET

        judul       = '$judul',
        kategori    = '$kategori',
        deskripsi   = '$deskripsi',
        foto        = '$foto',
        youtube_url = '$youtube_url'

    WHERE id='$id'
    AND user_id='$user_id'"

);


// ======================
// CEK UPDATE
// ======================

if (!$query) {

    echo json_encode([

        "status"  => "error",

        "message" => mysqli_error($conn)

    ]);

    exit;

}


// ======================
// HAPUS BAHAN LAMA
// ======================

mysqli_query(

    $conn,

    "DELETE FROM bahan
    WHERE resep_id='$id'"

);


// ======================
// INSERT BAHAN BARU
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
            '$id',
            '$nama',
            '$jumlah',
            '$urutan'
        )"

    );

}


// ======================
// HAPUS LANGKAH LAMA
// ======================

mysqli_query(

    $conn,

    "DELETE FROM langkah
    WHERE resep_id='$id'"

);


// ======================
// INSERT LANGKAH BARU
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
            '$id',
            '$nomor',
            '$instruksi'
        )"

    );

}


// ======================
// RESPONSE
// ======================

echo json_encode([

    "status"  => "success",

    "message" => "Resep berhasil diupdate"

]);

?>