async function loginUser() {

    try {

        const email =
        document.getElementById('email').value;

        const password =
        document.getElementById('password').value;

        const response = await fetch(

            `${BASE_URL}/auth/login.php`,

            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    email: email,
                    password: password

                })

            }

        );

        const result =
        await response.json();

        console.log(result);

        // LOGIN BERHASIL
        if (result.status === 'success') {


            window.location.href =
            'index.html';

        }

        // LOGIN GAGAL
        else {

            alert(result.message);

        }

    } catch (error) {

        console.log(error);

        alert('Terjadi error');

    }

}