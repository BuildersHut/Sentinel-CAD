document.addEventListener("DOMContentLoaded", loadRadio);

function loadRadio() {
  const messages = JSON.parse(localStorage.getItem("radioMessages")) || [];
  const output = document.getElementById("radioOutput");
  output.innerHTML = "";
  messages.forEach(msg => {
    const div = document.createElement("div");
    div.textContent = msg;
    output.appendChild(div);
  });
  output.scrollTop = output.scrollHeight;
}

function sendRadio() {
  const input = document.getElementById("radioInput");
  const message = input.value.trim();
  if (!message) return;

  const messages = JSON.parse(localStorage.getItem("radioMessages")) || [];
  messages.push(message);
  localStorage.setItem("radioMessages", JSON.stringify(messages));

  input.value = "";
  loadRadio();
}