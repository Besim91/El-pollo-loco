async function includeHTML() {
  // Hole dir alle Elemente die ein w3-in... haben
  let includeElements = document.querySelectorAll("[w3-include-html]");

  // Speichere alle Elemente in ein Array
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];

    // Diese Zeile liest den Wert "includeNew.html" aus und speichert ihn in eine variable
    file = element.getAttribute("w3-include-html"); // "includeNew.html"

    // Ladet mittels fetch() die Variable file hoch
    let resp = await fetch(file);

    if (resp.ok) {
      // Hier wird der Inhalt aus der Variable resp hochgeladen
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}
