function toggleAnimation() {
  const badgeElements = document.querySelectorAll("km-badge");
  const currentValue =
    badgeElements.item(0).getAttribute("has-animation") || "false";
  const newValue = currentValue === "true" ? "false" : "true";
  badgeElements.forEach((badgeElement) => {
    badgeElement.setAttribute("has-animation", newValue);
  });
}

function changePosition() {
  const allowedValues = [
    "top-right",
    "top-left",
    "bottom-left",
    "bottom-right",
  ];

  const badgeElements = document.querySelectorAll("km-badge");
  const currentValue =
    badgeElements.item(0).getAttribute("position") || allowedValues[0];
  const currentIndex = allowedValues.indexOf(currentValue);
  const nextIndex = (currentIndex + 1) % allowedValues.length;
  const newValue = allowedValues[nextIndex];
  badgeElements.forEach((badgeElement) => {
    badgeElement.setAttribute("position", newValue);
  });
}
