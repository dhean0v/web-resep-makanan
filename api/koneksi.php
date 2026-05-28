<?php

$conn = mysqli_connect(
    "localhost",
    "root",
    "",
    "pawonku"
);

if(!$conn){
    die("Koneksi gagal");
}