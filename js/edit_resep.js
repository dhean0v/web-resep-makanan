// =============================================
// edit_resep.js
// =============================================

const params =
new URLSearchParams(
    window.location.search
);

const id =
params.get('id');


// ==============================
// ISI FORM EDIT
// ==============================

async function getDetailEdit() {

    if (!id) return;

    try {

        const response =
        await fetch(

            `${BASE_URL}/author/detail_saya.php?id=${id}`,

            {
                credentials: 'include'
            }

        );

        const result =
        await response.json();

        console.log(result);


        // ==============================
        // ERROR
        // ==============================

        if (
            result.status === 'error'
        ) {

            alert(result.message);

            window.location.href =
            'author.html';

            return;

        }


        const resep =
        result.data;


        // ==============================
        // FIELD UTAMA
        // ==============================

        document.getElementById(
            'judul'
        ).value =
        resep.judul;


        document.getElementById(
            'kategori'
        ).value =
        resep.kategori;


        document.getElementById(
            'deskripsi'
        ).value =
        resep.deskripsi;


        document.getElementById(
            'youtube'
        ).value =
        resep.youtube_url ?? '';


        // ==============================
        // FOTO LAMA
        // ==============================

        document.getElementById(
            'gambarLama'
        ).src =

        resep.foto

        ? `../uploads/${resep.foto}`

        : 'https://via.placeholder.com/400x200';


        // ==============================
        // BAHAN
        // ==============================

        const bahanContainer =
        document.getElementById(
            'bahanContainer'
        );

        bahanContainer.innerHTML = '';

        resep.bahan.forEach(item => {

            bahanContainer.innerHTML += `

                <div class="row mb-3">

                    <div class="col-md-6">

                        <input
                            type="text"
                            class="form-control nama-bahan"
                            placeholder="Nama bahan"
                            value="${item.nama}"
                        >

                    </div>

                    <div class="col-md-6">

                        <input
                            type="text"
                            class="form-control jumlah-bahan"
                            placeholder="Jumlah"
                            value="${item.jumlah}"
                        >

                    </div>

                </div>

            `;

        });


        // ==============================
        // LANGKAH
        // ==============================

        const langkahContainer =
        document.getElementById(
            'langkahContainer'
        );

        langkahContainer.innerHTML = '';

        resep.langkah.forEach(item => {

            langkahContainer.innerHTML += `

                <div class="mb-3">

                    <textarea
                        class="form-control langkah-input"
                        rows="3"
                        placeholder="Langkah memasak"
                    >${item.instruksi}</textarea>

                </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}


// ==============================
// UPDATE RESEP
// ==============================

async function editResep() {

    if (!id) return;

    try {

        // ==============================
        // FORM DATA
        // ==============================

        const formData =
        new FormData();


        // ==============================
        // DATA UTAMA
        // ==============================

        formData.append(

            'judul',

            document.getElementById(
                'judul'
            ).value

        );


        formData.append(

            'kategori',

            document.getElementById(
                'kategori'
            ).value

        );


        formData.append(

            'deskripsi',

            document.getElementById(
                'deskripsi'
            ).value

        );


        formData.append(

            'youtube_url',

            document.getElementById(
                'youtube'
            ).value

        );


        // ==============================
        // FOTO BARU
        // ==============================

        const foto =

        document.getElementById(
            'gambar'
        ).files[0];


        if (foto) {

            formData.append(
                'foto',
                foto
            );

        }


        // ==============================
        // BAHAN
        // ==============================

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


        // ==============================
        // LANGKAH
        // ==============================

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


        // ==============================
        // FETCH
        // ==============================

        const response =
        await fetch(

            `${BASE_URL}/author/update_resep.php?id=${id}`,

            {
                method: 'POST',

                body: formData,

                credentials: 'include'
            }

        );


        const result =
        await response.json();

        console.log(result);

        alert(result.message);


        // ==============================
        // SUCCESS
        // ==============================

        if (
            result.status === 'success'
        ) {

            window.location.href =
            'author.html';

        }

    } catch (error) {

        console.log(error);

        alert(
            'Terjadi kesalahan'
        );

    }

}


// ==============================
// LOAD HALAMAN
// ==============================

document.addEventListener(

    'DOMContentLoaded',

    function () {

        getDetailEdit();

    }

);  