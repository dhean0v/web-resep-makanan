// ======================================
// GET SEMUA RESEP
// ======================================

async function getSemuaResep() {

    try {

        const response =
        await fetch(
            `${BASE_URL}/admin/get_semua_resep.php`
        );

        const result =
        await response.json();

        console.log(result);

        const container =
        document.getElementById(
            'listResep'
        );

        // KOSONG
        if (
            result.data.length === 0
        ) {

            container.innerHTML = `
            
            <tr>

                <td
                    colspan="5"
                    class="text-center py-4"
                >

                    Belum ada resep

                </td>

            </tr>

            `;

            return;

        }

        let html = '';

        result.data.forEach(resep => {

            html += `

            <tr>

                <!-- FOTO -->
                <td width="120">

                    <img
                        src="${
                            resep.foto
                            ? `../uploads/${resep.foto}`
                            : 'https://via.placeholder.com/120x80'
                        }"
                        class="img-fluid rounded"
                        style="
                            height:80px;
                            object-fit:cover;
                        "
                    >

                </td>


                <!-- JUDUL -->
                <td>

                    ${resep.judul}

                </td>


                <!-- USER -->
                <td>

                    ${resep.kategori}

                </td>


                <!-- STATUS -->
                <td>

                    <span class="
                        badge
                        ${
                            resep.status === 'published'
                            ? 'bg-success'
                            : 'bg-warning'
                        }
                    ">

                        ${resep.status}

                    </span>

                </td>


                <!-- BUTTON -->
                <td>

                    ${
                        resep.status !== 'published'
                        ?

                        `
                        <button
                            class="btn btn-success btn-sm me-1"
                            onclick="approveResep(${resep.id})"
                        >

                            Approve

                        </button>
                        `

                        :

                        ''
                    }

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="hapusResep(${resep.id})"
                    >

                        Hapus

                    </button>

                    <div class="mt-3">

                        <a
                            href="detail_admin.html?id=${resep.id}"
                            class="btn btn-sm text-white"
                            style="background:#C8622A;"
                        >
                            Lihat Detail
                        </a>

                    </div>  

                </td>

            </tr>

            `;

        });

        container.innerHTML =
        html;

    } catch (error) {

        console.log(error);

        // Mengganti alert kaku bawaan browser
        Swal.fire({
            icon: 'error',
            title: 'Gagal Memuat Data',
            text: 'Gagal mengambil data resep dari server.',
            confirmButtonColor: '#C8622A',
            background: '#FAF3E8'
        });

    }

}



// ======================================
// APPROVE RESEP
// ======================================

async function approveResep(id) {

    // Mengganti confirm() bawaan browser menjadi SweetAlert2
    Swal.fire({
        title: 'Approve resep ini?',
        text: "Resep akan diterbitkan ke halaman publik.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#27ae60', // Warna hijau sukses
        cancelButtonColor: '#6D4B34',  // Warna cokelat PawonKu
        confirmButtonText: 'Ya, Setujui',
        cancelButtonText: 'Batal',
        background: '#FAF3E8'
    }).then(async (result) => {
        
        // Jalankan logika jika admin menekan tombol 'Ya, Setujui'
        if (result.isConfirmed) {
            try {

                const response =
                await fetch(
                    `${BASE_URL}/admin/approve.php?id=${id}`
                );

                const resultData =
                await response.json();

                // Mengganti alert() bawaan browser setelah sukses fetch
                Swal.fire({
                    icon: resultData.status === 'success' ? 'success' : 'error',
                    title: resultData.status === 'success' ? 'Berhasil!' : 'Gagal',
                    text: resultData.message,
                    showConfirmButton: resultData.status !== 'success',
                    confirmButtonColor: '#C8622A',
                    timer: resultData.status === 'success' ? 1500 : undefined,
                    background: '#FAF3E8'
                }).then(() => {
                    if (resultData.status === 'success') {
                        getSemuaResep();
                    }
                });

            } catch (error) {

                console.log(error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error Sistem',
                    text: 'Gagal approve resep.',
                    confirmButtonColor: '#C8622A',
                    background: '#FAF3E8'
                });

            }
        }
    });

}



// ======================================
// HAPUS RESEP
// ======================================

async function hapusResep(id) {

    // Mengganti confirm() hapus lama menjadi SweetAlert2
    Swal.fire({
        title: 'Yakin ingin menghapus resep?',
        text: "Data masakan akan terhapus secara permanen dari server.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',     // Warna merah bahaya
        cancelButtonColor: '#6D4B34',   // Warna cokelat PawonKu
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        background: '#FAF3E8'
    }).then(async (result) => {
        
        // Jalankan logika jika admin menekan tombol 'Ya, Hapus'
        if (result.isConfirmed) {
            try {

                const response =
                await fetch(
                    `${BASE_URL}/admin/delete.php?id=${id}`
                );

                const resultData =
                await response.json();

                // Mengganti alert() bawaan browser setelah sukses hapus
                Swal.fire({
                    icon: resultData.status === 'success' ? 'success' : 'error',
                    title: resultData.status === 'success' ? 'Terhapus!' : 'Gagal',
                    text: resultData.message,
                    showConfirmButton: resultData.status !== 'success',
                    confirmButtonColor: '#C8622A',
                    timer: resultData.status === 'success' ? 1500 : undefined,
                    background: '#FAF3E8'
                }).then(() => {
                    if (resultData.status === 'success') {
                        getSemuaResep();
                    }
                });

            } catch (error) {

                console.log(error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error Sistem',
                    text: 'Gagal menghapus resep.',
                    confirmButtonColor: '#C8622A',
                    background: '#FAF3E8'
                });

            }
        }
    });

}



// ======================================
// LOAD
// ======================================

document.addEventListener(

    'DOMContentLoaded',

    function () {

        getSemuaResep();

    }

);