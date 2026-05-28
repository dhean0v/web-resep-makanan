<?php

header("Content-Type: application/json");

include "../koneksi.php";

$query = mysqli_query(

    $conn,

    "SELECT
        resep.*,
        users.nama AS author

    FROM resep

    LEFT JOIN users
    ON resep.user_id = users.id

    WHERE status='published'

    ORDER BY resep.id DESC"

);

$data = [];

while($row = mysqli_fetch_assoc($query)){

    $data[] = [

        "id" => $row['id'],
        "judul" => $row['judul'],
        "kategori" => $row['kategori'],
        "foto" => $row['foto'],
        "author" => $row['author'],
        "deskripsi" => $row['deskripsi']

    ];

}

echo json_encode($data);