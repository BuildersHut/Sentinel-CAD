// Generate a unique Case #
function generateCaseNumber() {
    return "CN-" + Date.now();
}

document.addEventListener("DOMContentLoaded", () => {
    const logoImg = document.getElementById("logoImg");
    const logoSelect = document.getElementById("logoSelect");
    const reportIdSpan = document.getElementById("reportId");

    if (reportIdSpan && !reportIdSpan.textContent) reportIdSpan.textContent = generateCaseNumber();

    if (logoSelect && logoImg) {
        logoSelect.addEventListener("change", () => {
            logoImg.src = logoSelect.value;
        });
    }

    const index = new URLSearchParams(window.location.search).get("id");
    const reports = JSON.parse(localStorage.getItem("reports")) || [];

    if (index !== null && reports[index]) {
        const r = reports[index];
        reportIdSpan.textContent = r.reportId;
        document.getElementById("suspectName").value = r.suspectName;
        document.getElementById("dob").value = r.dob;
        document.getElementById("suspectAddress").value = r.suspectAddress;
        document.getElementById("officerName").value = r.officerName;
        document.getElementById("badgeNumber").value = r.badgeNumber;
        document.getElementById("rank").value = r.rank;
        document.getElementById("unit").value = r.unit;
        document.getElementById("arrestLocation").value = r.arrestLocation;
        document.getElementById("charges").value = r.charges;
        document.getElementById("notes").value = r.notes;
        document.getElementById("reportDate").value = r.date;
        document.getElementById("logoImg").src = r.logo;
        document.getElementById("logoSelect").value = r.logo;
    }

    loadReportsAndCitations();
});

function saveReport() {
    const index = new URLSearchParams(window.location.search).get("id");
    const reports = JSON.parse(localStorage.getItem("reports")) || [];

    const newReport = {
        reportId: document.getElementById("reportId").textContent,
        suspectName: document.getElementById("suspectName").value,
        dob: document.getElementById("dob").value,
        suspectAddress: document.getElementById("suspectAddress").value,
        officerName: document.getElementById("officerName").value,
        badgeNumber: document.getElementById("badgeNumber").value,
        rank: document.getElementById("rank").value,
        unit: document.getElementById("unit").value,
        arrestLocation: document.getElementById("arrestLocation").value,
        charges: document.getElementById("charges").value,
        notes: document.getElementById("notes").value,
        date: document.getElementById("reportDate").value || new Date().toLocaleDateString(),
        logo: document.getElementById("logoSelect").value
    };

    if (index !== null) reports[index] = newReport;
    else reports.push(newReport);

    localStorage.setItem("reports", JSON.stringify(reports));
    alert("Report saved!");
    window.location.href = "reports.html";
}

function saveCitation() {
    const citations = JSON.parse(localStorage.getItem("citations")) || [];
    const params = new URLSearchParams(window.location.search);
    const editId = params.get("id");
    const citationId = document.getElementById("citationId").textContent || generateCitationNumber();

    const citation = {
        citationId,
        date: document.getElementById("citationDate").value || new Date().toLocaleDateString(),
        officerName: document.getElementById("officerName").value,
        badgeNumber: document.getElementById("badgeNumber").value,
        rank: document.getElementById("rank").value,
        unit: document.getElementById("unit").value,
        violatorName: document.getElementById("violatorName").value,
        violatorDOB: document.getElementById("violatorDOB").value,
        violatorAddress: document.getElementById("violatorAddress").value,
        violatorPlate: document.getElementById("violatorPlate").value,
        vehicleMake: document.getElementById("vehicleMake").value,
        vehicleModel: document.getElementById("vehicleModel").value,
        vehicleYear: document.getElementById("vehicleYear").value,
        violation: document.getElementById("violation").value,
        fineAmount: document.getElementById("fineAmount").value,
        violationLocation: document.getElementById("violationLocation").value,
        notes: document.getElementById("notes").value
    };

    if (editId !== null) citations[editId] = citation;
    else citations.push(citation);

    localStorage.setItem("citations", JSON.stringify(citations));
    alert("Citation saved!");
    window.location.href = "reports.html";
}

function generateCitationNumber() {
    const citationSpan = document.getElementById("citationId");
    if (citationSpan) citationSpan.textContent = "C-" + Math.floor(1000000 + Math.random() * 9000000);
}

function loadReportsAndCitations() {
    const table = document.getElementById("reportTable");
    if (!table) return;
    table.innerHTML = "";

    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const citations = JSON.parse(localStorage.getItem("citations")) || [];

    reports.forEach((rep, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${rep.reportId || ""}</td>
            <td>${rep.suspectName || "(Not entered)"}</td>
            <td>${rep.date || ""}</td>
            <td><button onclick="viewArrestReport(${index})">View</button></td>
            <td><button onclick="removeArrestReport(${index})" style="background-color:#d9534f;color:white;">Remove</button></td>
        `;
        table.appendChild(row);
    });

    citations.forEach((c, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${c.citationId || ""}</td>
            <td>${c.violatorName || "(Not entered)"}</td>
            <td>${c.date || ""}</td>
            <td><button onclick="viewCitation(${index})">View</button></td>
            <td><button onclick="removeCitation(${index})" style="background-color:#d9534f;color:white;">Remove</button></td>
        `;
        table.appendChild(row);
    });
}

function viewArrestReport(index) {
    window.location.href = `arrest-report-edit.html?id=${index}`;
}

function removeArrestReport(index) {
    if (!confirm("Delete this report?")) return;
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.splice(index, 1);
    localStorage.setItem("reports", JSON.stringify(reports));
    loadReportsAndCitations();
}

function viewCitation(index) {
    window.location.href = `citation-report-edit.html?id=${index}`;
}

function removeCitation(index) {
    if (!confirm("Delete this citation?")) return;
    const citations = JSON.parse(localStorage.getItem("citations")) || [];
    citations.splice(index, 1);
    localStorage.setItem("citations", JSON.stringify(citations));
    loadReportsAndCitations();
}
