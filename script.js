document.addEventListener("DOMContentLoaded", loadUnits);

function loadUnits() {
  let units = JSON.parse(localStorage.getItem("units")) || [];
  const table = document.getElementById("unitTable");
  table.innerHTML = "";

  units.forEach((unit, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${unit.id}</td>
      <td>${unit.name}</td>
      <td>${unit.status}</td>
      <td>
        <select class="statusUpdate" onchange="updateStatus(${index}, this.value)">
          <option ${unit.status === "Available" ? "selected" : ""}>Available</option>
          <option ${unit.status === "Busy" ? "selected" : ""}>Busy</option>
          <option ${unit.status === "En Route" ? "selected" : ""}>En Route</option>
          <option ${unit.status === "On Scene" ? "selected" : ""}>On Scene</option>
          <option ${unit.status === "10-7 (Out of Service)" ? "selected" : ""}>10-7 (Out of Service)</option>
        </select>
      </td>
      <td><button onclick="removeUnit(${index})">Remove</button></td>
    `;
    table.appendChild(row);
  });
}

function addUnit() {
  const id = document.getElementById("unitId").value.trim();
  const name = document.getElementById("unitName").value.trim();
  const status = document.getElementById("unitStatus").value;
  if (!id || !name) return;

  let units = JSON.parse(localStorage.getItem("units")) || [];
  units.push({ id, name, status });
  localStorage.setItem("units", JSON.stringify(units));

  document.getElementById("unitId").value = "";
  document.getElementById("unitName").value = "";
  loadUnits();
}

function updateStatus(index, newStatus) {
  let units = JSON.parse(localStorage.getItem("units")) || [];
  units[index].status = newStatus;
  localStorage.setItem("units", JSON.stringify(units));
  loadUnits();
}

function removeUnit(index) {
  let units = JSON.parse(localStorage.getItem("units")) || [];
  units.splice(index, 1);
  localStorage.setItem("units", JSON.stringify(units));
  loadUnits();
}
function clearDatabase() {
    if (confirm("Are you sure you want to erase ALL data? This cannot be undone.")) {
        localStorage.clear();
        alert("All data has been cleared.");
        location.reload();
    }
}