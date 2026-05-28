async function getDetailResepSaya() {

    // AMBIL ID
    const params =
    new URLSearchParams(
        window.location.search
    );

    const id =
    params.get('id');

    // CEK ID
    if (!id) {

        alert('ID resep tidak ditemukan');

        return;

    }

    try {

        // FETCH API
        const response =
        await fetch(
            `${BASE_URL}/author/detail_saya.php?id=${id}`
        );

        const result =
        await response.json();

        console.log(result);

        // CEK STATUS
        if (result.status !== 'success') {

            alert(result.message);

            window.location.href =
            'author.html';

            return;

        }

        // TAMPILKAN RESEP
        tampilkanResep(
            result.data
        );


        // ======================
        // BUTTON EDIT
        // ======================

        document.getElementById(
            'btnEdit'
        ).href =
        `edit_resep.html?id=${id}`;


        // ======================
        // BUTTON HAPUS
        // ======================

        document.getElementById(
            'btnHapus'
        ).addEventListener(

            'click',

            async function () {

                const yakin =
                confirm(
                    'Yakin ingin menghapus resep?'
                );

                if (!yakin) return;

                try {

                    const hapus =
                    await fetch(
                        `${BASE_URL}/author/delete.php?id=${id}`
                    );

                    const hasil =
                    await hapus.json();

                    alert(
                        hasil.message
                    );

                    if (
                        hasil.status === 'success'
                    ) {

                        window.location.href =
                        'author.html';

                    }

                } catch (error) {

                    console.log(error);

                    alert(
                        'Gagal menghapus resep'
                    );

                }

            }

        );

    } catch (error) {

        console.log(error);

        alert(
            'Terjadi kesalahan'
        );

    }

}


// ======================
// TAMPILKAN RESEP
// ======================

function tampilkanResep(resep) {

    // JUDUL
    document.getElementById(
        'judulResep'
    ).innerText =
    resep.judul;


    // FOTO
    document.getElementById(
        'fotoResep'
    ).src =
    resep.foto
    ? `../uploads/${resep.foto}`
    : 'https://via.placeholder.com/900x350';


    // KATEGORI
    document.getElementById(
        'kategoriResep'
    ).innerText =
    resep.kategori;


    // AUTHOR
    document.getElementById(
        'authorResep'
    ).innerText =
    resep.author;


    // DESKRIPSI
    document.getElementById(
        'deskripsiResep'
    ).innerText =
    resep.deskripsi;


    // ======================
    // BAHAN
    // ======================

    let bahanHTML = '';

    if (
        resep.bahan.length > 0
    ) {

        resep.bahan.forEach(item => {

            bahanHTML += `
                <li>
                    ${item.jumlah} - ${item.nama}
                </li>
            `;

        });

    } else {

        bahanHTML =
        `
            <li>
                Belum ada bahan
            </li>
        `;

    }

    document.getElementById(
        'bahanResep'
    ).innerHTML =
    bahanHTML;


    // ======================
    // LANGKAH
    // ======================

    let langkahHTML = '';

    if (
        resep.langkah.length > 0
    ) {

        resep.langkah.forEach(item => {

            langkahHTML += `
                <li>
                    ${item.instruksi}
                </li>
            `;

        });

    } else {

        langkahHTML =
        `
            <li>
                Belum ada langkah
            </li>
        `;

    }

    document.getElementById(
        'langkahResep'
    ).innerHTML =
    langkahHTML;


    // ======================
    // VIDEO YOUTUBE
    // ======================

    const youtubeFrame =
    document.getElementById(
        'youtubeResep'
    );

    if (youtubeFrame) {

        if (
            resep.youtube_url &&
            resep.youtube_url !== ''
        ) {

            let videoId = '';

            // FORMAT WATCH
            if (
                resep.youtube_url.includes('watch?v=')
            ) {

                videoId =
                resep.youtube_url.split('v=')[1];

            }

            // FORMAT SHORT
            else if (
                resep.youtube_url.includes('youtu.be/')
            ) {

                videoId =
                resep.youtube_url.split('youtu.be/')[1];

            }

            if (videoId) {

                youtubeFrame.src =
                `https://www.youtube.com/embed/${videoId}`;

            }

        }

    }

}


// ======================
// LOAD
// ======================

document.addEventListener(

    'DOMContentLoaded',

    function () {

        getDetailResepSaya();

    }

);  