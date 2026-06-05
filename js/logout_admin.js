async function logoutAdmin() {
    // Memunculkan pop-up konfirmasi SweetAlert2 di dalam web
    Swal.fire({
        title: 'Yakin ingin keluar?',
        text: "Anda harus login kembali untuk mengakses panel admin PawonKu.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#C8622A', // Warna oranye tema PawonKu
        cancelButtonColor: '#6D4B34',  // Warna cokelat tema PawonKu
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal',
        background: '#FAF3E8'
    }).then(async (result) => {
        // Jika admin menekan tombol 'Ya, Keluar'
        if (result.isConfirmed) {
            try {
                await fetch(`${BASE_URL}/admin/logout.php`);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Keluar',
                    text: 'Anda telah keluar dari sesi admin.',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#FAF3E8'
                }).then(() => {
                    window.location.href = 'index.html';
                });
            } catch (error) {
                console.log(error);
                window.location.href = 'index.html';
            }
        }
    });
}