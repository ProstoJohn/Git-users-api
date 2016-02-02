function closestF(element, c) {
  var curElement = element;
  while (curElement && !curElement.classList.contains(c)) curElement = curElement.parentElement;
  return curElement;
};