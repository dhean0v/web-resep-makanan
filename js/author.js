async function getResepSaya() {
    try {
        const response = await fetch(`${BASE_URL}/author/get_resep_saya.php`, { credentials: 'include' });
        const result = await response.json();
        const container = document.getElementById('listResepSaya');

        if (result.status === 'error') {
            window.location.href = '../html/login.html';
            return;
        }

        if (result.data.length === 0) {
            document.getElementById('emptyResep').classList.remove('d-none');
            return;
        }

        let html = '';
        result.data.forEach(resep => {
            let warnaStatus = '#f39c12';
            let labelStatus = '⏳ Menunggu';
            if (resep.status === 'published') {
                warnaStatus = '#27ae60';
                labelStatus = '✓ Disetujui';
            }

            html += `
            <div class=\"col-md-4\" id=\"card-${resep.id}\">
                <div class=\"card border-0 shadow-sm rounded-4 mb-4\">
                    <img src=\"${resep.foto ? `../uploads/${resep.foto}` : 'https://via.placeholder.com/300x200'}\" class=\"card-img-top rounded-top-4\" style=\"height:200px; object-fit:cover;\">
                    <div class=\"card-body\">
                        <span class=\"badge text-white mb-2\" style=\"background-color:${warnaStatus}\">${labelStatus}</span>
                        <h5 class=\"card-title fw-bold text-dark\">${resep.judul}</h5>
                        <p class=\"card-text text-secondary text-truncate\">${resep.deskripsi}</p>
                        <div class=\"d-flex gap-2 mt-3\">
                            <a href=\"detail_resep_saya.html?id=${resep.id}\" class=\"btn btn-sm btn-outline-primary\">Detail</a>
                            <a href=\"edit_resep.html?id=${resep.id}\" class=\"btn btn-sm btn-warning\">Edit</a>
                            <button class=\"btn btn-sm btn-danger\" onclick=\"hapusResep(${resep.id}, '${resep.judul}')\">Hapus</button>
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

async function hapusResep(id, judul) {
    Swal.fire({
        title: 'Hapus Resep?',
        text: `Apakah Anda yakin ingin menghapus resep "${judul}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6D4B34',
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        background: '#FAF3E8'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${BASE_URL}/author/delete_resep.php?id=${id}`, { credentials: 'include' });
                const dataRes = await response.json();

                if (dataRes.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Terhapus!',
                        text: dataRes.message,
                        showConfirmButton: false,
                        timer: 1500,
                        background: '#FAF3E8'
                    }).then(() => {
                        getResepSaya();
                    });
                } else {
                    Swal.fire({ icon: 'error', title: 'Gagal', text: dataRes.message, background: '#FAF3E8' });
                }
            } catch (error) {
                console.log(error);
                Swal.fire({ icon: 'error', title: 'Error', text: 'Gagal menghapus resep.', background: '#FAF3E8' });
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    getResepSaya();
});