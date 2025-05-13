const form = document.getElementById('omsetForm');
const statusText = document.getElementById('status');
const rekapTable = document.getElementById('rekapTable').querySelector('tbody');

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzCVNFR5pe8UusPutXGGb2nC5swMT3pxm36ANoVFBXfjkYo6UKd1SMrkaqTW5lx7gcWmA/exec';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  statusText.innerText = 'Mengirim data...';

  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      body: formData
    });

    const result = await response.text();
    statusText.innerText = result;
    form.reset();
    loadRekap();
  } catch (error) {
    statusText.innerText = 'Gagal mengirim: ' + error.message;
  }
});

async function loadRekap() {
  try {
    const res = await fetch(WEB_APP_URL + '?rekap=true');
    const data = await res.json();
    rekapTable.innerHTML = '';
    data.forEach(row => {
      const jam = row[0];
      const akun = row[1];
      const omset = row[2];
      rekapTable.innerHTML += `<tr><td>${jam}</td><td>${akun}</td><td>${omset}</td></tr>`;
    });
  } catch (err) {
    rekapTable.innerHTML = '<tr><td colspan="3">Gagal memuat data</td></tr>';
  }
}

loadRekap();
