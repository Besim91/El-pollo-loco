function openImpressum() {
  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("impressum").classList.remove("d-none");
}

function closeImpressum() {
  document.getElementById("startScreen").classList.remove("d-none");
  document.getElementById("impressum").classList.add("d-none");
}
function openGameplayInfo() {
  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("gameplay").classList.remove("d-none");
}

function closeGameplayInfo() {
  document.getElementById("startScreen").classList.remove("d-none");
  document.getElementById("gameplay").classList.add("d-none");
}
