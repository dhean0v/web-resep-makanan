// search navbar
document.addEventListener('DOMContentLoaded', function () {
  const searchInputs = document.querySelectorAll('input[type="search"]');
  searchInputs.forEach(function (input) {
    // Placeholder warna putih transparan
    input.style.color = 'white';
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = input.value.trim();
        if (q) {
          window.location.href = 'resep.html?cari=' + encodeURIComponent(q);
        }
      }
    });
  });



  // filter search
  if (window.location.pathname.includes('resep.html')) {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('cari') || '';
    // Isi input search kalau ada keyword dari URL
    if (keyword) {
      searchInputs.forEach(inp => inp.value = keyword);
    }

    // Filter kartu resep berdasarkan keyword
    function filterResep(keyword) {
      const cards = document.querySelectorAll('.card');
      const kw = keyword.toLowerCase().trim();
      let ada = false;

      cards.forEach(function (card) {
        const judul = card.querySelector('h6, h5');
        if (!judul) return;
        const cocok = judul.textContent.toLowerCase().includes(kw);
        card.closest('[class*="col-"]').style.display = cocok ? '' : 'none';
        if (cocok) ada = true;
      });

      // Tampilkan pesan kalau tidak ada hasil
      let pesanEl = document.getElementById('pw-tidak-ada');
      if (!ada) {
        if (!pesanEl) {
          pesanEl = document.createElement('div');
          pesanEl.id = 'pw-tidak-ada';
          pesanEl.className = 'col-12 text-center py-5';
          pesanEl.innerHTML = `
            <div style="font-size:3rem;">🍳</div>
            <h5 class="mt-3">Resep "<strong>${keyword}</strong>" tidak ditemukan</h5>
            <p class="text-secondary">Coba kata kunci lain</p>
            <button onclick="resetFilter()" class="btn text-white px-4 rounded-pill" style="background:#C8622A;">
              Lihat Semua
            </button>`;
          document.querySelector('.row.g-4').appendChild(pesanEl);
        }
        // Sembunyikan pagination
        const pagination = document.querySelector('.text-center.mt-5');
        if (pagination) pagination.style.display = 'none';
      } else {
        if (pesanEl) pesanEl.remove();
        const pagination = document.querySelector('.text-center.mt-5');
        if (pagination) pagination.style.display = '';
      }
    }

    // Jalankan filter saat halaman load
    if (keyword) filterResep(keyword);

    // Filter realtime saat user ketik
    searchInputs.forEach(function (input) {
      input.addEventListener('input', function () {
        filterResep(input.value);
      });
    });

    // Fungsi reset — tampilkan semua resep
    window.resetFilter = function () {
      searchInputs.forEach(inp => inp.value = '');
      document.querySelectorAll('[class*="col-"]').forEach(col => col.style.display = '');
      const pesanEl = document.getElementById('pw-tidak-ada');
      if (pesanEl) pesanEl.remove();
      const pagination = document.querySelector('.text-center.mt-5');
      if (pagination) pagination.style.display = '';
    };
  }

// nav link otomatis
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(function (link) {
    link.classList.remove('active', 'text-white');
    link.classList.add('text-white-50');

    const href = link.getAttribute('href');
    if (href === page ||
       (page === '' && href === 'index.html') ||
       (page.includes('detail') && href === 'resep.html') ||
       (page.includes('buat_resep') && href === 'author.html') ||
       (page.includes('edit_resep') && href === 'author.html')) {
      link.classList.add('active', 'text-white');
      link.classList.remove('text-white-50');
    }
  });



// konfirmasi hapus resep
  const btnHapus = document.querySelectorAll('a.text-danger');

  btnHapus.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const judul = btn.closest('.card-body').querySelector('h6');
      const nama = judul ? judul.textContent : 'resep ini';
      const yakin = confirm('Yakin mau hapus "' + nama + '"?');
      if (yakin) {
        // Hapus card dari tampilan
        const card = btn.closest('[class*="col-"]');
        card.style.transition = 'opacity .3s';
        card.style.opacity = '0';
        setTimeout(() => card.remove(), 300);
      }
    });
  });

// validasi login
  const formLogin = document.querySelector('form');

  if (window.location.pathname.includes('login.html') && formLogin) {
    formLogin.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.querySelector('input[type="text"]').value.trim();
      const password = document.querySelector('input[type="password"]').value.trim();

      hapusAlert();

      if (!username || !password) {
        tampilAlert('Username dan password wajib diisi!', 'danger');
        return;
      }

      // Simulasi login berhasil → redirect ke index
      tampilAlert('Login berhasil! Mengalihkan...', 'success');
      setTimeout(() => window.location.href = 'index.html', 1500);
    });
  }

// validasi registrasi
  if (window.location.pathname.includes('registrasi.html') && formLogin) {
    formLogin.addEventListener('submit', function (e) {
      e.preventDefault();
      const inputs = document.querySelectorAll('input');
      const username  = inputs[0].value.trim();
      const email     = inputs[1].value.trim();
      const password  = inputs[2].value.trim();
      const konfirm   = inputs[3].value.trim();

      hapusAlert();

      if (!username || !email || !password || !konfirm) {
        tampilAlert('Semua field wajib diisi!', 'danger');
        return;
      }

      if (!email.includes('@')) {
        tampilAlert('Format email tidak valid!', 'danger');
        return;
      }

      if (password.length < 6) {
        tampilAlert('Password minimal 6 karakter!', 'danger');
        return;
      }

      if (password !== konfirm) {
        tampilAlert('Password dan konfirmasi tidak cocok!', 'danger');
        return;
      }

      tampilAlert('Registrasi berhasil! Mengalihkan ke login...', 'success');
      setTimeout(() => window.location.href = 'login.html', 1500);
    });
  }

// validasi form tambah dan edit
  const isBuatResep = window.location.pathname.includes('buat_resep.html');
  const isEditResep = window.location.pathname.includes('edit_resep.html');

  if ((isBuatResep || isEditResep) && formLogin) {
    formLogin.addEventListener('submit', function (e) {
      e.preventDefault();
      const namaResep = document.querySelector('input[type="text"]').value.trim();
      const bahan     = document.querySelectorAll('textarea')[0].value.trim();
      const langkah   = document.querySelectorAll('textarea')[1].value.trim();

      hapusAlert();

      if (!namaResep) {
        tampilAlert('Nama resep wajib diisi!', 'danger');
        return;
      }

      if (!bahan) {
        tampilAlert('Bahan-bahan wajib diisi!', 'danger');
        return;
      }

      if (!langkah) {
        tampilAlert('Langkah memasak wajib diisi!', 'danger');
        return;
      }

      const pesan = isBuatResep ? 'Resep berhasil ditambahkan!' : 'Resep berhasil diperbarui!';
      tampilAlert(pesan, 'success');
      setTimeout(() => window.location.href = 'author.html', 1500);
    });
  }


// tampilkan dan hapus alert
  function tampilAlert(pesan, tipe) {
    hapusAlert();
    const div = document.createElement('div');
    div.id = 'pw-alert';
    div.className = `alert alert-${tipe} alert-dismissible fade show`;
    div.innerHTML = `${pesan}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;

    // Taruh di atas tombol submit
    const btnSubmit = document.querySelector('button[type="submit"]');
    if (btnSubmit) {
      btnSubmit.parentNode.insertBefore(div, btnSubmit);
    }
  }

  function hapusAlert() {
    const lama = document.getElementById('pw-alert');
    if (lama) lama.remove();
  }

});