document.addEventListener("DOMContentLoaded", loadCalls);

function loadCalls() {
  let units = JSON.parse(localStorage.getItem("units")) || [];
  let calls = JSON.parse(localStorage.getItem("calls")) || [];

  const unitSelect = document.getElementById("callUnitSelect");
  unitSelect.innerHTML = "";
  units.forEach(u => {
    const option = document.createElement("option");
    option.value = u.id;
    option.textContent = `${u.id} ${u.name}`;
    unitSelect.appendChild(option);
  });

  const table = document.getElementById("callsTable");
  table.innerHTML = "";
  calls.forEach((call, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${call.id}</td>
      <td>${call.summary}</td>
      <td>${call.units.join(", ")}</td>
      <td><button onclick="removeCall(${index})">Remove</button></td>
    `;
    table.appendChild(row);
  });
}

function createCall() {
  const calls = JSON.parse(localStorage.getItem("calls")) || [];
  const callIdInput = document.getElementById("callId");
  const summaryInput = document.getElementById("callSummary");
  const selectedUnits = Array.from(document.getElementById("callUnitSelect").selectedOptions).map(o => o.value);

  let callId = callIdInput.value.trim() || `C-${Date.now()}`;
  let summary = summaryInput.value.trim() || "No summary";

  calls.unshift({ id: callId, summary, units: selectedUnits });
  localStorage.setItem("calls", JSON.stringify(calls));

  callIdInput.value = "";
  summaryInput.value = "";
  loadCalls();
}

function removeCall(index) {
  let calls = JSON.parse(localStorage.getItem("calls")) || [];
  calls.splice(index, 1);
  localStorage.setItem("calls", JSON.stringify(calls));
  loadCalls();
}