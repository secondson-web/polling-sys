document.addEventListener("DOMContentLoaded", () => {
  const names = [
    "NAMI",
    "RITA",
    "PRI",
    "NANAT",
    "LULU",
    "UYUY",
    "NUR",
    "ARDEN",
    "FACHRIL",
  ];
  const selects = document.querySelectorAll(".poll-select");

  // Isi dropdown dengan nama-nama pilihan
  selects.forEach((select) => {
    names.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      const selectedValues = Array.from(selects).map((s) => s.value);
      selects.forEach((s) => {
        Array.from(s.options).forEach((option) => {
          option.disabled =
            selectedValues.includes(option.value) && s.value !== option.value;
        });
      });
    });
  });

  // Kirim data ke Google Sheets
  document.getElementById("pollForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {};
    selects.forEach((select) => {
      data[select.name] = select.value;
    });

    fetch(
      "https://script.google.com/macros/s/AKfycbwQTcFprJEkCL6snSq6SkHSkEu39mGT6S7CiXJJfy3DnBJVXNHBivhIEMHril1p5EiOmA/exec",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((result) => alert("Polling berhasil dikirim!"))
      .catch((error) => console.error("Error:", error));
  });
});
