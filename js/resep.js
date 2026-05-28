async function getSemuaResep() {

    try {

        const response = await fetch(
            `${BASE_URL}/resep/semua_resep.php`
        );

        const data = await response.json();

        tampilkanResep(data);

    } catch (error) {

        console.log(error);

    }
}


function tampilkanResep(data) {

    const grid =
        document.getElementById('gridResep');

    if (!grid) return;

    let output = '';

    data.forEach(resep => {

        let warna = '#C8622A';

        if (resep.kategori === 'Minuman') {
            warna = '#1a7a8a';
        }

        if (resep.kategori === 'Dessert') {
            warna = '#8a4a9e';
        }

        let gambar =
        'https://via.placeholder.com/400x220';

        if (resep.foto) {

            gambar =
            `../uploads/${resep.foto}`;

        }

        output += `

        <div class="col-md-4 mb-4"
            data-kategori="${resep.kategori}">

            <div class="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">

                <img
                    src="${gambar}"
                    class="card-img-top"
                    style="height:220px; object-fit:cover;"
                >

                <div class="card-body">

                    <span
                        class="badge rounded-pill text-white mb-2"
                        style="background:${warna};"
                    >
                        ${resep.kategori}
                    </span>

                    <h5>${resep.judul}</h5>

                    <small class="text-secondary">
                        oleh ${resep.author}
                    </small>

                    <div class="mt-3">

                        <a
                            href="detail_resep.html?id=${resep.id}"
                            class="btn btn-sm text-white"
                            style="background:#C8622A;"
                        >
                            Lihat Detail
                        </a>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    grid.innerHTML = output;
}


// FILTER
function filterKategori(kategori) {

    const cards =
        document.querySelectorAll(
            '#gridResep [data-kategori]'
        );

    cards.forEach(card => {

        if (

            kategori === 'Semua' ||

            card.dataset.kategori === kategori

        ) {

            card.style.display = 'block';

        } else {

            card.style.display = 'none';

        }

    });
}


document.addEventListener(

    'DOMContentLoaded',

    function () {

        getSemuaResep();

    }

);