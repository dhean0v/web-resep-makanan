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

                    ${resep.nama_user}

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
                            class="btn btn-success btn-sm"
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

                </td>

            </tr>

            `;

        });

        container.innerHTML =
        html;

    } catch (error) {

        console.log(error);

        alert(
            'Gagal mengambil data resep'
        );

    }

}



// ======================================
// APPROVE RESEP
// ======================================

async function approveResep(id) {

    const yakin =
    confirm(
        'Approve resep ini?'
    );

    if (!yakin) return;

    try {

        const response =
        await fetch(
            `${BASE_URL}/admin/approve.php?id=${id}`
        );

        const result =
        await response.json();

        alert(
            result.message
        );

        if (
            result.status === 'success'
        ) {

            getSemuaResep();

        }

    } catch (error) {

        console.log(error);

        alert(
            'Gagal approve resep'
        );

    }

}



// ======================================
// HAPUS RESEP
// ======================================

async function hapusResep(id) {

    const yakin =
    confirm(
        'Yakin ingin menghapus resep?'
    );

    if (!yakin) return;

    try {

        const response =
        await fetch(
            `${BASE_URL}/admin/delete.php?id=${id}`
        );

        const result =
        await response.json();

        alert(result.message);

        if (
            result.status === 'success'
        ) {

            getSemuaResep();

        }

    } catch (error) {

        console.log(error);

        alert(
            'Gagal menghapus resep'
        );

    }

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