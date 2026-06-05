// ==========================================
// 1. FUNGSI LOGIN USER
// ==========================================
async function loginUser() {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch(`${BASE_URL}/auth/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const result = await response.json();
        console.log(result);

        if (result.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Masuk',
                text: 'Selamat datang kembali di PawonKu!',
                showConfirmButton: false,
                timer: 1500,
                background: '#FAF3E8'
            }).then(() => {
                window.location.href = 'index.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Masuk',
                text: result.message || 'Email atau password salah.',
                confirmButtonColor: '#C8622A',
                background: '#FAF3E8'
            });
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Gagal Login',
            text: 'Terjadi kesalahan sistem saat mencoba masuk.',
            confirmButtonColor: '#C8622A',
            background: '#FAF3E8'
        });
    }
}

// ==========================================
// 2. FUNGSI LOGOUT USER
// ==========================================
async function logoutUser() {
    // Tampilkan pop-up konfirmasi Yakin/Batal di dalam web
    Swal.fire({
        title: 'Yakin ingin keluar?',
        text: "Anda harus login kembali jika ingin menambahkan atau mengelola resep di PawonKu.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#C8622A', // Warna oranye tema PawonKu
        cancelButtonColor: '#6D4B34',  // Warna cokelat tema PawonKu
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal',
        background: '#FAF3E8'
    }).then(async (result) => {
        // Jika user menekan tombol 'Ya, Keluar'
        if (result.isConfirmed) {
            try {
                // Panggil file PHP logout user yang sudah kamu punya
                await fetch(`${BASE_URL}/auth/logout.php`);
                
                // Tampilkan pop-up sukses keluar sebentar
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Keluar',
                    text: 'Terima kasih telah berbagi resep di PawonKu!',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#FAF3E8'
                }).then(() => {
                    // Otomatis pindah ke halaman utama publik
                    window.location.href = 'index.html';
                });
            } catch (error) {
                console.log(error);
                window.location.href = 'index.html';
            }
        }
    });
}