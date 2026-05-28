async function logoutAdmin() {

    await fetch(
        `${BASE_URL}/admin/logout.php`
    );

    window.location.href =
    'index.html';

}