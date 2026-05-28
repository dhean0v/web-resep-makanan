// =============================================
// buat_resep.js — tambah resep baru
// =============================================

const form =
document.getElementById(
    'formBuatResep'
);

if (form) {

    form.addEventListener(

        'submit',

        async function (e) {

            e.preventDefault();

            const btnSubmit =
            form.querySelector(
                'button[type="submit"]'
            );

            btnSubmit.disabled = true;
            btnSubmit.innerText = 'Menyimpan...';

            try {

                // ======================
                // FORM DATA
                // ======================

                const formData =
                new FormData();


                // ======================
                // DATA UTAMA
                // ======================

                formData.append(
                    'judul',
                    document.getElementById('judul').value
                );

                formData.append(
                    'deskripsi',
                    document.getElementById('deskripsi').value
                );

                formData.append(
                    'kategori',
                    document.getElementById('kategori').value
                );

                formData.append(
                    'youtube_url',
                    document.getElementById('youtube_url').value
                );


                // ======================
                // FOTO
                // ======================

                const fotoInput =
                document.getElementById('foto');

                if (fotoInput.files.length > 0) {

                    formData.append(
                        'foto',
                        fotoInput.files[0]
                    );

                }


                // ======================
                // BAHAN
                // ======================

                const namaBahan =
                document.querySelectorAll(
                    '.nama-bahan'
                );

                const jumlahBahan =
                document.querySelectorAll(
                    '.jumlah-bahan'
                );

                namaBahan.forEach((item, index) => {

                    formData.append(
                        'nama_bahan[]',
                        item.value
                    );

                    formData.append(
                        'jumlah_bahan[]',
                        jumlahBahan[index].value
                    );

                });


                // ======================
                // LANGKAH
                // ======================

                const langkah =
                document.querySelectorAll(
                    '.langkah-input'
                );

                langkah.forEach(item => {

                    formData.append(
                        'langkah[]',
                        item.value
                    );

                });


                // ======================
                // FETCH API
                // ======================

                const response =
                await fetch(

                    `${BASE_URL}/author/tambah_resep.php`,

                    {
                        method: 'POST',

                        body: formData,

                        credentials: 'include'
                    }

                );


                // ======================
                // JSON RESPONSE
                // ======================

                const result =
                await response.json();

                console.log(result);

                alert(result.message);


                // ======================
                // SUCCESS
                // ======================

                if (
                    result.status === 'success'
                ) {

                    form.reset();

                    window.location.href =
                    'author.html';

                }

            } catch (error) {

                console.log(error);

                alert(
                    'Terjadi kesalahan saat upload resep'
                );

            } finally {

                btnSubmit.disabled = false;

                btnSubmit.innerText =
                'Tambah Resep';

            }

        }

    );

}