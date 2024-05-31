/**
 * Asynchronously loads HTML content into elements with the `w3-include-html` attribute.
 * For each such element, fetches the HTML content from the specified file and includes it
 * within the element. If the file cannot be fetched, displays "Page not found" within the element.
 *
 * @async
 * @function includeHTML
 * @returns {Promise<void>} A promise that resolves when all HTML content has been included.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    const file = element.getAttribute("w3-include-html");
    try {
      let resp = await fetch(file);
      if (resp.ok) {
        element.innerHTML = await resp.text();
      } else {
        element.innerHTML = "Page not found";
      }
    } catch (error) {
      element.innerHTML = "Page not found";
    }
  }
}
