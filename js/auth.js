async function loginUser() {
    const email    = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${BASE_URL}/auth/login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        const result = await response.json();
        alert('role: ' + result.role);

        console.log('role:', result.role); // hapus setelah berhasil

        if (result.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Masuk',
                showConfirmButton: false,
                timer: 1500,
                background: '#FAF3E8'
            }).then(() => {
                if (result.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Login',
                text: result.message,
                background: '#FAF3E8'
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Gagal koneksi ke server',
            background: '#FAF3E8'
        });
    }
}