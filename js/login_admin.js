const form =
document.getElementById(
    'formLoginAdmin'
);

form.addEventListener(

    'submit',

    async function (e) {

        e.preventDefault();

        try {

            const response =
            await fetch(

                `${BASE_URL}/admin/login.php`,

                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                        'application/json'
                    },

                    body: JSON.stringify({

                        username:
                        document.getElementById(
                            'username'
                        ).value,

                        password:
                        document.getElementById(
                            'password'
                        ).value

                    })

                }

            );

            const result =
            await response.json();

            alert(
                result.message
            );

            if (
                result.status === 'success'
            ) {

                window.location.href =
                'admin.html';

            }

        } catch (error) {

            console.log(error);

            alert(
                'Login gagal'
            );

        }

    }

);