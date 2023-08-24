
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

//move this??
const deployLayout = () => {
  createLayout('div', 1, body, ['main-container']);
  createLayout('div', 1,
    document.querySelector('.main-container'),
    ['flex-top-box', 'container']);
  createLayout('div', 3,
    document.querySelector('.container'),
    ['flex-box', 'heading'],
    ['flex-box', 'content'],
    ['flex-box', 'footer']);

  //heading part
  createLayout('div', 2,
    document.querySelector('.heading'),
    ['flex-box', 'logo'],
    ['flex-box', 'nav']);
  createLayout('h1', 1,
    document.querySelector('.logo'));
  createLayout('button', 3,
    document.querySelector('.nav'));

  //heading texts
  document.querySelector('.logo > h1').textContent =
    'Fruitypatooty';
  document.querySelector('.nav > button:nth-child(1)')
    .textContent = 'Home';
  document.querySelector('.nav > button:nth-child(2)')
    .textContent = 'Menu';
  document.querySelector('.nav > button:nth-child(3)')
    .textContent = 'Contact';

  //footer
  createLayout('p', 1,
    document.querySelector('.footer'));
  document.querySelector('.footer p')
    .textContent = 'Photo by ';
  createLayout('a', 1,
    document.querySelector('.footer p'));
  document.querySelector('.footer p a')
    .setAttribute('href', 'https://www.pexels.com/photo/mango-juice-in-clear-glass-bottle-4955257/');
  document.querySelector('.footer p a')
    .textContent = 'Roman Odintsov';
}

export {
  //generateElement,
  //appendElementTo,
  createLayout,
  deployLayout,
  clearLayout
};