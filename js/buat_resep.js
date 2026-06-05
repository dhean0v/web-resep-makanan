const form = document.getElementById('formBuatResep');

if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btnSubmit = form.querySelector('button[type="submit"]');
        btnSubmit.disabled = true;
        btnSubmit.innerText = 'Menyimpan...';

        try {
            const formData = new FormData();
            formData.append('judul', document.getElementById('judul').value);
            formData.append('deskripsi', document.getElementById('deskripsi').value);
            formData.append('kategori', document.getElementById('kategori').value);
            formData.append('youtube_url', document.getElementById('youtube_url').value);

            const fotoInput = document.getElementById('foto');
            if (fotoInput && fotoInput.files[0]) {
                formData.append('foto', fotoInput.files[0]);
            }

            const bahan = document.querySelectorAll('.nama-bahan');
            const jumlah = document.querySelectorAll('.jumlah-bahan');
            bahan.forEach((item, index) => {
                formData.append('nama_bahan[]', item.value);
                formData.append('jumlah_bahan[]', jumlah[index].value);
            });

            const langkah = document.querySelectorAll('.langkah-input');
            langkah.forEach(item => {
                formData.append('langkah[]', item.value);
            });

            const response = await fetch(`${BASE_URL}/author/tambah_resep.php`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const result = await response.json();

            if (result.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Resep Disimpan',
                    text: 'Resep Anda berhasil ditambahkan dan menunggu persetujuan admin!',
                    showConfirmButton: false,
                    timer: 2000,
                    background: '#FAF3E8'
                }).then(() => {
                    form.reset();
                    window.location.href = 'author.html';
                });
            } else {
                Swal.fire({ icon: 'error', title: 'Gagal Menyimpan', text: result.message, background: '#FAF3E8' });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({ icon: 'error', title: 'Error', text: 'Terjadi kesalahan saat upload resep', background: '#FAF3E8' });
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerText = 'Tambah Resep';
        }
    });
}