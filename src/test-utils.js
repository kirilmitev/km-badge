export class TestUtils {
  /**
   * Renders a given element with provided attributes
   * and returns a promise which resolves as soon as
   * rendered element becomes available.
   *
   * @param {string} tagName
   * @param {object} attributes
   * @returns {Promise<HTMLElement>}
   */
  static render(tagName, attributes = {}) {
    // Convert attributes to HTML string representation
    // For example `{ foo: "bar", baz: "foo" }` becomes `foo="bar" baz="foo"`
    const htmlAttributes = Object.entries(attributes)
      .map((entry) => `${entry[0]}="${entry[1]}"`)
      .join(" ");

    // Replaces document's body with provided element
    document.body.innerHTML = `<${tagName} ${htmlAttributes}></${tagName}>`;

    // Wait for WebComponent to render
    return new Promise((resolve) => {
      function requestComponent() {
        const element = document.querySelector(tagName);
        if (element) {
          resolve(element);
        } else {
          window.requestAnimationFrame(requestComponent);
        }
      }
      requestComponent();
    });
  }
}
