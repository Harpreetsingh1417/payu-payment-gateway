const dropZone = document.getElementById("dropZone");
const browseButton = document.getElementById("browseButton");
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const preview = document.getElementById("previewContainer");
const table = document.getElementById("csvTable");


// Browse button
browseButton.addEventListener("click", e => {
    e.stopPropagation();
    fileInput.click();
});


// Click drop zone
dropZone.addEventListener("click", () => {
    fileInput.click();
});


// File selected from browser
fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) {
        handleFile(fileInput.files[0]);
    }
});


// Drag over
dropZone.addEventListener("dragover", e => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
});


// Drag leave
dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
});


// File dropped
dropZone.addEventListener("drop", e => {

    e.preventDefault();

    dropZone.classList.remove("drag-over");

    const file = e.dataTransfer.files[0];

    if (file) {
        handleFile(file);
    }
});


// Validate and process file
function handleFile(file) {

    const isCSV =
        file.name.toLowerCase().endsWith(".csv") ||
        file.type === "text/csv";

    if (!isCSV) {

        fileName.textContent =
            "❌ Please select a CSV file.";

        preview.style.display = "none";
        table.innerHTML = "";

        return;
    }

    fileName.textContent =
        `✅ ${file.name}`;

    readCSV(file);
}


// Read and parse CSV
function readCSV(file) {

    const reader = new FileReader();

    reader.onload = e => {

        const text = e.target.result.trim();

        if (!text) {

            fileName.textContent =
                "❌ The CSV file is empty.";

            preview.style.display = "none";

            return;
        }

        // Split into rows
        const rows = text.split(/\r?\n/);

        // Split rows into columns
        const data = rows.map(row => row.split(","));

        console.log(data);

        renderTable(data);
    };

    reader.onerror = () => {

        fileName.textContent =
            "❌ Error reading the file.";

        preview.style.display = "none";
    };

    reader.readAsText(file);
}


// Render first 20 data rows
function renderTable(data) {

    table.innerHTML = "";

    // Header + first 20 data rows
    const rows = data.slice(0, 21);

    rows.forEach((row, index) => {

        const tr = document.createElement("tr");

        row.forEach(value => {

            const cell = document.createElement(
                index === 0 ? "th" : "td"
            );

            cell.textContent = value.trim();

            tr.appendChild(cell);
        });

        table.appendChild(tr);
    });

    preview.style.display = "block";
}