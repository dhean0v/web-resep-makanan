// Jalankan di awal admin.html untuk memastikan yang akses adalah admin
async function checkAdmin() {
    try {
        const response = await fetch(`${BASE_URL}/auth/cek_login.php`, {
            credentials: 'include'
        });
        const result = await response.json();

        if (result.status !== 'success' || result.user.role !== 'admin') {
            window.location.href = 'login.html';
        }
    } catch (error) {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', checkAdmin);