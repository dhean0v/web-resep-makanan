async function checkLogin() {

    try {

        const response =
        await fetch(
            `${BASE_URL}/auth/cek_login.php`
        );

        const result =
        await response.json();

        console.log(result);

        const navbarAuth =
        document.getElementById(
            'navbarAuth'
        );

        // ======================
        // SUDAH LOGIN
        // ======================

        if (
            result.status === 'success'
        ) {

            navbarAuth.innerHTML =
            `
                <div class="dropdown">

                    <button
                        class="btn border-0 dropdown-toggle d-flex align-items-center gap-2 text-white"
                        data-bs-toggle="dropdown"
                    >

                        <img
                            src="${
                                result.user.foto_profil
                                ? `../uploads/${result.user.foto_profil}`
                                : 'https://ui-avatars.com/api/?name=' + result.user.nama
                            }"
                            width="40"
                            height="40"
                            class="rounded-circle"
                            style="object-fit:cover;"
                        >

                        <span>

                            ${result.user.nama}

                        </span>

                    </button>

                    <ul
                        class="dropdown-menu dropdown-menu-end shadow border-0 rounded-4"
                    >

                        <li>

                            <a
                                class="dropdown-item"
                                href="author.html"
                            >
                                📖 Resep Saya
                            </a>

                        </li>

                        <li>

                            <hr class="dropdown-divider">

                        </li>

                        <li>

                            <button
                                class="dropdown-item text-danger"
                                onclick="logout()"
                            >
                                🚪 Logout
                            </button>

                        </li>

                    </ul>

                </div>
            `;

        }

        // ======================
        // BELUM LOGIN
        // ======================

        else {

            navbarAuth.innerHTML =
            `
                <div class="d-flex gap-2">

                    <a
                        href="login.html"
                        class="btn btn-sm text-white rounded-pill px-4"
                        style="background:#C8622A;"
                    >

                        Login

                    </a>

                </div>
            `;

        }

    } catch (error) {

        console.log(error);

    }

}


// =========================================================
// 🌟 LOGOUT (HANYA MENGUBAH VALIDASI MENJADI SWEETALERT2)
// =========================================================

async function logout() {

    // Menampilkan jendela konfirmasi melayang menggantikan confirm() bawaan
    Swal.fire({
        title: 'Yakin ingin logout?',
        text: "Sesi Anda akan diakhiri dan harus login kembali untuk mengakses fitur.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#C8622A', // Warna oranye utama PawonKu
        cancelButtonColor: '#6D4B34',  // Warna cokelat aksen PawonKu
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal',
        background: '#FAF3E8'          // Menyesuaikan warna krem background web
    }).then(async (result) => {
        
        // Jalankan fetch jika user menekan tombol 'Ya, Keluar'
        if (result.isConfirmed) {
            try {

                const response =
                await fetch(
                    `${BASE_URL}/auth/logout.php`
                );

                const resultData =
                await response.json();

                // Notifikasi pop-up sukses keluar sebentar sebelum redirect halaman
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Keluar',
                    text: 'Sampai jumpa kembali di PawonKu!',
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

// ======================
// LOAD
// ======================

document.addEventListener(

    'DOMContentLoaded',

    function () {

        checkLogin();

    }

);