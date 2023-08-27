
const body = document.body;
const elems = [];

const appendElementTo = (nodeRef) => {
  while (elems.length > 0) {
    nodeRef.appendChild(elems.splice(0, 1)[0]);
  }
};

const generateElement = (element, num) => {
  for (let i = 0; i < num; i++) {
    elems.splice(elems.length, 0, document.createElement(element));
  }
};

const createLayout = (elem, count, nodeRef, ...classes) => {
  generateElement(elem, count);
  for (let i = 0; i < count; i++) {
    if (classes[i] === undefined) continue;
    elems[i].classList.add(...classes[i])
  }
  appendElementTo(nodeRef);

  //TODO
  //test adding to style tag in head
};

const clearLayout = (nodeRef) => {
  while (nodeRef.firstChild) {
    nodeRef.removeChild(nodeRef.firstChild);
  }
};

const clearLayoutSibling = (nodeRef) => {
  while (nodeRef.nextElementSibling) {
    nodeRef.parentElement.removeChild(nodeRef.nextElementSibling);
  }
};


export {
  createLayout,
  clearLayout,
  clearLayoutSibling
};