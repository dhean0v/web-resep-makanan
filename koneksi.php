<?php
$host = "localhost";
$db_user = "root";
$db_pass = "";
$database = "db_resep";

$conn = mysqli_connect($host, $db_user, $db_pass, $database);
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>