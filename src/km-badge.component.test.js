import { KMBadge } from "./km-badge.component.js";
import { TestUtils } from "./test-utils.js";

describe("KM-Badge WebComponent", () => {
  let rootEl;

  beforeEach(async () => {
    rootEl = await TestUtils.render(KMBadge.tagName);
  });

  it("should have default attribute values if none are given", async () => {
    checkAttributes(KMBadge.defaultValues);
  });

  it("Should react to changes of attribute values", async () => {
    const attributes = {
      text: "12",
      "text-color": "#d3d3d3",
      "background-color": "#5cb85c",
      "border-color": "#4cae4c",
      "has-animation": "true",
      position: "top-left",
    };

    checkAttributes(KMBadge.defaultValues);

    Object.entries(attributes).forEach((entry) => {
      rootEl.setAttribute(entry[0], entry[1]);
    });

    checkAttributes(attributes);
  });

  /**
   * Asserts that the values of the provided attributes are reflected in the web component.
   *
   * @param attributes - key-value-pairs of attributes and their values.
   */
  function checkAttributes(attributes) {
    const badgeEl = rootEl.shadowRoot.getRootNode().querySelector(".badge");
    const textEl = rootEl.shadowRoot.getRootNode().querySelector(".text");

    expect(badgeEl).toBeDefined();
    expect(textEl).toBeDefined();
    expect(textEl.innerText).toBe(attributes.text);
    expect(rgbToHex(badgeEl.style.color)).toBe(attributes["text-color"]);
    expect(rgbToHex(badgeEl.style.backgroundColor)).toBe(
      attributes["background-color"]
    );
    if (attributes["border-color"] === "transparent") {
      expect(badgeEl.style.borderColor).toBe(attributes["border-color"]);
    } else {
      expect(rgbToHex(badgeEl.style.borderColor)).toBe(
        attributes["border-color"]
      );
    }

    if (attributes["has-animation"] === "true") {
      expect(badgeEl.classList.contains("animated")).toBeTrue();
    } else {
      expect(badgeEl.classList.contains("animated")).toBeFalse();
    }

    expect(badgeEl.classList.contains(attributes.position)).toBeTrue();
  }

  /**
   * Converts a color represented by an RGB string to HEX format.
   *
   * @param {string} rgbString - e.g. rgb(255, 255, 255)
   * @returns {string} hex string - e.g. #ffffff
   */
  function rgbToHex(rgbString) {
    function toHex(c) {
      const hex = parseInt(c).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }

    // Cut away CSS part
    const rgb = rgbString.split("(")[1].split(")")[0].split(",");

    return "#" + toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2]);
  }
});
