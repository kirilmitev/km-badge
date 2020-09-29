const templateEl = document.createElement("template");
const templateContent = `
    <div class="badge" aria-label="Badge">
        <span class="text"></span>
    </div>
`;

const templateStyles = `
    <style>
        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid;
          width: 1em;
          height: 1em;
          border-radius: 50%;
          padding: 3px;
        }
        
        .badge.top-right {
          position: absolute;
          right: -0.5em;
          top: -0.5em;
        }
        
        .badge.bottom-right {
          position: absolute;
          right: -0.5em;
          bottom: -0.5em;
        }
        
        .badge.top-left {
          position: absolute;
          left: -0.5em;
          top: -0.5em;
        }
        
        .badge.bottom-left {
          position: absolute;
          left: -0.5em;
          bottom: -0.5em;
        }
        
        .badge.animated {
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
          }
          
          70% {
            box-shadow: 0 0 0 2em rgba(0, 0, 0, 0);
          }
          
          100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          }
        }
    </style>
`;

templateEl.innerHTML = templateStyles + templateContent;

/**
 * Base class for our WebComponent.
 */
export class KMBadge extends HTMLElement {
  badgeEl;
  textEl;

  static get defaultValues() {
    return {
      text: "0",
      "text-color": "#ffffff",
      "background-color": "#008100",
      "border-color": "transparent",
      "has-animation": "false",
      position: "top-right",
    };
  }

  static get tagName() {
    return "km-badge";
  }

  static get observedAttributes() {
    return [
      "text",
      "text-color",
      "background-color",
      "border-color",
      "has-animation",
      "position",
    ];
  }

  constructor() {
    super();

    this.init();
  }

  setText(value) {
    this.textEl.textContent = value;
  }

  setTextColor(value) {
    this.badgeEl.style.color = value;
  }

  setBackgroundColor(value) {
    this.badgeEl.style.backgroundColor = value;
  }

  setBorderColor(value) {
    this.badgeEl.style.borderColor = value;
  }

  setHasAnimation(value) {
    this.badgeEl.classList.toggle("animated", value === "true");
  }

  setPosition(value) {
    const allowedValues = [
      "top-right",
      "top-left",
      "bottom-left",
      "bottom-right",
    ];

    if (!allowedValues.includes(value)) {
      console.error(
        "Invalid position value. Allowed values include: ",
        allowedValues
      );
    } else {
      allowedValues.forEach((positionClass) => {
        this.badgeEl.classList.remove(positionClass);
      });
      this.badgeEl.classList.add(value);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "text":
        this.setText(newValue);
        break;
      case "text-color":
        this.setTextColor(newValue);
        break;
      case "background-color":
        this.setBackgroundColor(newValue);
        break;
      case "border-color":
        this.setBorderColor(newValue);
        break;
      case "has-animation":
        this.setHasAnimation(newValue);
        break;
      case "position":
        this.setPosition(newValue);
        break;
    }
  }

  init() {
    // Create a shadow root
    this.attachShadow({ mode: "open" });

    // Attach template with styles
    this.shadowRoot.appendChild(templateEl.content.cloneNode(true));

    // Save references to often used elements
    this.badgeEl = this.shadowRoot.querySelector(".badge");
    this.textEl = this.shadowRoot.querySelector(".text");

    // Read and set attributes
    const text = this.getAttribute("text") || KMBadge.defaultValues.text;
    const textColor =
      this.getAttribute("text-color") || KMBadge.defaultValues["text-color"];
    const backgroundColor =
      this.getAttribute("background-color") ||
      KMBadge.defaultValues["background-color"];
    const borderColor =
      this.getAttribute("border-color") ||
      KMBadge.defaultValues["border-color"];
    const hasAnimation =
      this.getAttribute("has-animation") ||
      KMBadge.defaultValues["has-animation"];
    const position =
      this.getAttribute("position") || KMBadge.defaultValues["position"];
    this.setText(text);
    this.setTextColor(textColor);
    this.setBackgroundColor(backgroundColor);
    this.setBorderColor(borderColor);
    this.setHasAnimation(hasAnimation);
    this.setPosition(position);
  }
}

// Define the new element
customElements.define(KMBadge.tagName, KMBadge);
