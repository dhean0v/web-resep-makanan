async function getDetailResep() {

    // AMBIL ID DARI URL
    const params =
    new URLSearchParams(
        window.location.search
    );

    const id =
    params.get('id');

    // CEK ID
    if (!id) {
        return;

    }

    try {

        // FETCH API
        const response =
        await fetch(
            `${BASE_URL}/resep/detail.php?id=${id}`
        );

        // CONVERT JSON
        const result =
        await response.json();

        console.log(result);

        // CEK STATUS
        if (result.status !== 'success') {

            alert(result.message);

            return;

        }

        // TAMPILKAN DATA
        tampilkanResep(
            result.data
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

    resep.bahan.forEach(item => {

        bahanHTML += `
            <li>
                ${item.jumlah} - ${item.nama}
            </li>
        `;

    });

    document.getElementById(
        'bahanResep'
    ).innerHTML =
    bahanHTML;


    // ======================
    // LANGKAH
    // ======================

    let langkahHTML = '';

    resep.langkah.forEach(item => {

        langkahHTML += `
            <li>
                ${item.instruksi}
            </li>
        `;

    });

    document.getElementById(
        'langkahResep'
    ).innerHTML =
    langkahHTML;


    // ======================
    // VIDEO YOUTUBE
    // ======================

    if (resep.youtube_url) {

        let videoId = '';

        // LINK BIASA
        if (
            resep.youtube_url.includes('watch?v=')
        ) {

            videoId =
            resep.youtube_url.split('v=')[1];

            // HAPUS PARAMETER TAMBAHAN
            if (videoId.includes('&')) {

                videoId =
                videoId.split('&')[0];

            }

        }

        // LINK youtu.be
        else if (
            resep.youtube_url.includes('youtu.be/')
        ) {

            videoId =
            resep.youtube_url.split('youtu.be/')[1];

        }

        // TAMPILKAN VIDEO
        if (videoId) {

            document.getElementById(
                'youtubeContainer'
            ).innerHTML = `

                <div
                    class="card shadow-sm mb-4"
                >

                    <div
                        class="card-body p-4 custom-card"
                    >

                        <h4
                            class="section-title mb-3"
                        >
                            🎥 Video Tutorial
                        </h4>

                        <div
                            class="d-flex justify-content-center"
                        >

                            <iframe
                                src="https://www.youtube.com/embed/${videoId}"
                                allowfullscreen
                                style="
                                    width:100%;
                                    max-width:560px;
                                    height:315px;
                                    border:none;
                                    border-radius:18px;
                                "
                            ></iframe>

                        </div>

                    </div>

                </div>

            `;

        }

    }

}


// ======================
// JALANKAN
// ======================

document.addEventListener(

    'DOMContentLoaded',

    function () {

        getDetailResep();

    }

);