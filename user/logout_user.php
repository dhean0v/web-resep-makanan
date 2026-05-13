<?php
session_start();
session_destroy(); // hapus semua session user
header("Location: ../Interface.php");
exit();
?>