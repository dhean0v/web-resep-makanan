// ======================================
// REGISTER
// ======================================

const form = document.getElementById(
    'formRegister'
);


form.addEventListener(

    'submit',

    async function (e) {

        e.preventDefault();


        // ======================
        // DATA
        // ======================

        const nama = document
        .getElementById('nama')
        .value;

        const email = document
        .getElementById('email')
        .value;

        const password = document
        .getElementById('password')
        .value;

        const konfirmasi = document
        .getElementById('konfirmasi')
        .value;


        // ======================
        // VALIDASI PASSWORD
        // ======================

        if (password !== konfirmasi) {

            alert(
                'Konfirmasi password tidak sama'
            );

            return;

        }


        try {

            // ======================
            // FETCH API
            // ======================

            const response =
            await fetch(

                `${BASE_URL}/auth/register.php`,

                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                        'application/json'
                    },

                    body: JSON.stringify({

                        nama,
                        email,
                        password

                    })

                }

            );


            // ======================
            // RESPONSE
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

                window.location.href =
                'login.html';

            }

        } catch (error) {

            console.log(error);

            alert(
                'Terjadi kesalahan'
            );

        }

    }

);