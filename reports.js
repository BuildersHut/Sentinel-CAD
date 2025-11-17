document.addEventListener("DOMContentLoaded", () => {
    loadReportsTable();
});

function loadReportsTable() {
    const table = document.getElementById("reportTable");
    table.innerHTML = "";

    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const citations = JSON.parse(localStorage.getItem("citations")) || [];

    reports.forEach((rep, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${rep.reportId || "N/A"}</td>
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
            <td>${c.citationId || "N/A"}</td>
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
    loadReportsTable();
}

function viewCitation(index) {
    window.location.href = `citation-report-edit.html?id=${index}`;
}

function removeCitation(index) {
    if (!confirm("Delete this citation?")) return;
    const citations = JSON.parse(localStorage.getItem("citations")) || [];
    citations.splice(index, 1);
    localStorage.setItem("citations", JSON.stringify(citations));
    loadReportsTable();
}

function newReport() {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const reportId = "CN-" + Date.now();
    const newReport = {
        reportId,
        suspectName: "",
        dob: "",
        suspectAddress: "",
        officerName: "",
        badgeNumber: "",
        rank: "",
        unit: "",
        arrestLocation: "",
        charges: "",
        notes: "",
        date: new Date().toLocaleDateString(),
        logo: "lapd.jpg"
    };
    reports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(reports));
    window.location.href = `arrest-report-edit.html?id=${reports.length - 1}`;
}

function newCitation() {
    const citations = JSON.parse(localStorage.getItem("citations")) || [];
    const citationId = "C-" + Math.floor(1000000 + Math.random() * 9000000);
    const newCitation = {
        citationId,
        date: new Date().toLocaleDateString(),
        officerName: "",
        badgeNumber: "",
        rank: "",
        unit: "",
        violatorName: "",
        violatorDOB: "",
        violatorAddress: "",
        violatorPlate: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        violation: "",
        fineAmount: "",
        violationLocation: "",
        notes: ""
    };
    citations.push(newCitation);
    localStorage.setItem("citations", JSON.stringify(citations));
    window.location.href = `citation-report-edit.html?id=${citations.length - 1}`;
}
