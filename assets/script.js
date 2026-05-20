// JS kecil untuk: menu mobile, tahun footer, dan form kirim via WhatsApp

const nav = document.querySelector("#nav");
const toggle = document.querySelector(".nav-toggle");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Tutup menu setelah klik link (mobile)
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Tahun di footer
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

// Form permintaan -> buka WhatsApp dengan pesan yang sudah diisi
const form = document.querySelector("#form-penawaran");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nama = String(data.get("nama") || "").trim();
    const perusahaan = String(data.get("perusahaan") || "").trim();
    const kebutuhan = String(data.get("kebutuhan") || "").trim();
    const pesan = String(data.get("pesan") || "").trim();

    const bodyLines = [
      "Permintaan Penawaran",
      "",
      `Nama: ${nama}`,
      perusahaan ? `Perusahaan: ${perusahaan}` : null,
      `Kebutuhan: ${kebutuhan}`,
      "",
      "Detail:",
      pesan,
      "",
      "--",
      "PB Jaya Satria",
      "PB JAYA SATRIA jual beli padi dan beras di Cianjur",
    ].filter(Boolean);

    const waNumber = "6285795560428"; // format internasional tanpa + (Indonesia)
    const url = new URL(`https://wa.me/${waNumber}`);
    url.searchParams.set("text", bodyLines.join("\n"));
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  });
}
