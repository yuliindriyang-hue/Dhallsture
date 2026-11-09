
const products = [
  ["5", 1500],
  ["12", 2500],
  ["50", 8000],
  ["70", 8500],
  ["100", 15000],
  ["140", 19000],
  ["150", 20500],
  ["210", 29000],
  ["355", 46000],
  ["500", 66000],
  ["720", 93000],
  ["1000", 130000],
  ["1450", 185000],
  ["2180", 276000],
  ["3640", 500000]
];

let selected = null;

const grid = document.getElementById("productGrid");

function rupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

// MENAMPILKAN PRODUK
products.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "product";

  card.innerHTML = `
    <div class="diamond">💎</div>
    <h3>${item[0]} Diamond</h3>
    <p>${rupiah(item[1])}</p>
    <small>Pilih paket ini</small>
  `;

  card.addEventListener("click", () => {
    document.querySelectorAll(".product").forEach(el => {
      el.classList.remove("active");
    });

    card.classList.add("active");

    selected = {
      diamond: item[0],
      price: item[1]
    };

    document.getElementById("selectedProduct").textContent =
      item[0] + " Diamond - " + rupiah(item[1]);
  });

  grid.appendChild(card);
});

// LOADING
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hide");
  }, 2500);
});

// MUSIK
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

music.volume = 0.4;

music.play().then(() => {
  musicBtn.textContent = "♫ MUSIC ON";
}).catch(() => {
  musicBtn.textContent = "♫ KLIK UNTUK MUSIK";
});

function toggleMusic() {
  if (music.paused) {
    music.play().then(() => {
      musicBtn.textContent = "♫ MUSIC ON";
    }).catch(() => {
      alert("Musik belum bisa diputar.");
    });
  } else {
    music.pause();
    musicBtn.textContent = "♫ MUSIC OFF";
  }
}

// PEMBAYARAN
function openPayment() {
  if (!selected) {
    alert("Silakan pilih diamond terlebih dahulu!");
    return;
  }

  document.getElementById("paymentModal").classList.add("show");
}

function closePayment() {
  document.getElementById("paymentModal").classList.remove("show");
}

// BUKTI TRANSFER
function showProof() {
  closePayment();
  document.getElementById("proofModal").classList.add("show");
}

function closeProof() {
  document.getElementById("proofModal").classList.remove("show");
}

// PREVIEW SCREENSHOT
document.getElementById("proofFile").addEventListener("change", function() {
  const file = this.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Pilih file gambar!");
    this.value = "";
    return;
  }

  const preview = document.getElementById("preview");
  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
});

// WHATSAPP ADMIN
function sendWhatsApp() {
  if (!selected) {
    alert("Pilih diamond terlebih dahulu!");
    return;
  }

  const file = document.getElementById("proofFile").files[0];

  if (!file) {
    alert("Upload screenshot bukti transfer terlebih dahulu!");
    return;
  }

  const nomor = "6287869339272";

  const pesan =
    "HALO ADMIN DHALL STURE 👑\n\n" +
    "Saya sudah melakukan pembayaran.\n\n" +
    "Diamond: " + selected.diamond + " 💎\n" +
    "Total: " + rupiah(selected.price) + "\n" +
    "Metode: QRIS / DANA\n" +
    "Nama pembayaran: AFDHALL\n\n" +
    "Saya akan melampirkan screenshot bukti transfer ini.\n\n" +
    "Terima kasih DHALL STURE!";

  const url = "https://wa.me/" + nomor +
    "?text=" + encodeURIComponent(pesan);

  window.open(url, "_blank");
}
