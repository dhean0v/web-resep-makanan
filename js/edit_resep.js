const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function getDetailEdit() {
    if (!id) return;
    try {
        const response = await fetch(`${BASE_URL}/author/detail_saya.php?id=${id}`, { credentials: 'include' });
        const result = await response.json();

        if (result.status === 'error') {
            Swal.fire({ icon: 'error', title: 'Gagal Memuat', text: result.message, background: '#FAF3E8' }).then(() => {
                window.location.href = 'author.html';
            });
            return;
        }

        const resep = result.data;
        document.getElementById('judul').value = resep.judul;
        document.getElementById('kategori').value = resep.kategori;
        document.getElementById('deskripsi').value = resep.deskripsi;
        document.getElementById('youtube_url').value = resep.youtube_url;

        // Render bahan & langkah lama di sini...
    } catch (error) {
        console.log(error);
    }
}

async function updateResep() {
    try {
        const formData = new FormData();
        formData.append('judul', document.getElementById('judul').value);
        formData.append('kategori', document.getElementById('kategori').value);
        formData.append('deskripsi', document.getElementById('deskripsi').value);
        formData.append('youtube_url', document.getElementById('youtube_url').value);

        const fotoInput = document.getElementById('foto');
        if (fotoInput && fotoInput.files[0]) {
            formData.append('foto', fotoInput.files[0]);
        }

        document.querySelectorAll('.nama-bahan').forEach((item, index) => {
            formData.append('nama_bahan[]', item.value);
            formData.append('jumlah_bahan[]', document.querySelectorAll('.jumlah-bahan')[index].value);
        });

        document.querySelectorAll('.langkah-input').forEach(item => {
            formData.append('langkah[]', item.value);
        });

        const response = await fetch(`${BASE_URL}/author/update_resep.php?id=${id}`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const result = await response.json();

        if (result.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Resep Diperbarui',
                text: result.message,
                showConfirmButton: false,
                timer: 1500,
                background: '#FAF3E8'
            }).then(() => {
                window.location.href = 'author.html';
            });
        } else {
            Swal.fire({ icon: 'error', title: 'Gagal Update', text: result.message, background: '#FAF3E8' });
        }
    } catch (error) {
        console.log(error);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Terjadi kesalahan sistem.', background: '#FAF3E8' });
    }
}