// =============================================
// author.js — tampil dan hapus resep milik user
// =============================================

async function getResepSaya() {

    try {

        const response = await fetch(
            `${BASE_URL}/author/get_resep_saya.php`,
            { credentials: 'include' } // ← kirim session cookie
        );

        const result = await response.json();

        const container =
            document.getElementById('listResepSaya');

        // Belum login → ke halaman login
        if (result.status === 'error') {
            alert('Silakan login');
            window.location.href = '../html/    login.html';
            return;
        }

        // Tidak ada resep
        if (result.data.length === 0) {
            document.getElementById('emptyResep')
                .classList.remove('d-none');
            return;
        }

        let html = '';

        result.data.forEach(resep => {

            // Warna badge status
            let warnaStatus = '#f39c12';
            let labelStatus = '⏳ Menunggu';
            if (resep.status === 'approved') {
                warnaStatus = '#27ae60';
                labelStatus = '✓ Disetujui';
            }

            html += `
            <div class="col-md-4" id="card-${resep.id}">
                <div class="card border-0 rounded-4 shadow-sm overflow-hidden h-100">

                    <img
                        src="${resep.foto ? `../uploads/${resep.foto}` : 'https://via.placeholder.com/400x200'}"
                        style="height:200px; object-fit:cover;"
                    >

                    <div class="card-body">

                        <span class="badge mb-1"
                            style="background:#C8622A; color:white;">
                            ${resep.kategori}
                        </span>

                        <span class="badge mb-2"
                            style="background:${warnaStatus}; color:white; font-size:0.7rem;">
                            ${labelStatus}
                        </span>

                        <h5>${resep.judul}</h5>

                        <div class="d-flex gap-2 mt-3">

                            <a href="detail_resep_saya.html?id=${resep.id}"
                                class="btn btn-sm text-white"
                                style="background:#C8622A;">
                                Lihat
                            </a>

                            <a href="edit_resep.html?id=${resep.id}"
                                class="btn btn-sm btn-warning">
                                Edit
                            </a>

                            <button
                                class="btn btn-sm btn-danger"
                                onclick="hapusResep(${resep.id}, '${resep.judul}')">
                                Hapus
                            </button>

                        </div>

                    </div>

                </div>
            </div>`;
        });

        container.innerHTML = html;

    } catch (error) {
        console.log(error);
    }
}


// ==============================
// HAPUS RESEP
// ==============================

async function hapusResep(id, judul) {

    const yakin = confirm(`Yakin hapus "${judul}"?`);
    if (!yakin) return;

    try {

        const response = await fetch(
            `${BASE_URL}/author/delete_resep.php?id=${id}`,
            { credentials: 'include' } // ← kirim session cookie
        );

        const result = await response.json();

        alert(result.message);

        if (result.status === 'success') {
            // Refresh daftar resep
            getResepSaya();
        }

    } catch (error) {
        console.log(error);
    }
}


// ==============================
// JALANKAN SAAT HALAMAN DIBUKA
// ==============================

document.addEventListener('DOMContentLoaded', function () {

    if (document.getElementById('listResepSaya')) {
        getResepSaya();
    }

});