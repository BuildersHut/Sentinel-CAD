document.addEventListener("DOMContentLoaded", loadBolos);

function loadBolos(){
  const bolos=JSON.parse(localStorage.getItem("bolos"))||[];
  const table=document.getElementById("bolosTable");
  table.innerHTML="";
  bolos.forEach((b,index)=>{
    const row=document.createElement("tr");
    row.innerHTML=`
      <td>${b.id}</td>
      <td>${b.desc}</td>
      <td><button onclick="removeBolo(${index})">Remove</button></td>
    `;
    table.appendChild(row);
  });
}

function createBolo(){
  const bolos=JSON.parse(localStorage.getItem("bolos"))||[];
  const id=document.getElementById("boloId").value.trim()||`B-${Date.now()}`;
  const desc=document.getElementById("boloDesc").value.trim()||"No description";

  bolos.unshift({id,desc});
  localStorage.setItem("bolos", JSON.stringify(bolos));

  document.getElementById("boloId").value="";
  document.getElementById("boloDesc").value="";
  loadBolos();
}

function removeBolo(index){
  const bolos=JSON.parse(localStorage.getItem("bolos"))||[];
  bolos.splice(index,1);
  localStorage.setItem("bolos", JSON.stringify(bolos));
  loadBolos();
}