<?php
function jsonResponse(array $data, int $httpCode = 200): void
{
    http_response_code($httpCode);
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');          // izinkan request dari HTML
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    echo json_encode($data);
    exit();
}
 
function getJsonInput(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}
 
function requireLogin(): void
{
    if (session_status() === PHP_SESSION_NONE) session_start();
    if (empty($_SESSION['user_id'])) {
        jsonResponse(['status' => 'error', 'message' => 'Silakan login terlebih dahulu'], 401);
    }
}
 
function requireAdmin(): void
{
    requireLogin();
    if ($_SESSION['role'] !== 'admin') {
        jsonResponse(['status' => 'error', 'message' => 'Akses ditolak'], 403);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit();
}