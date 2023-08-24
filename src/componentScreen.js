import * as layout from './componentLayout';

function deployLayout() {
  layout.createLayout('div', 1,
    document.body,
    ['main-container']);
  layout.createLayout('div', 1,
    document.querySelector('.main-container'),
    ['flex-top-box', 'container']);
}

function updateScreen() {

}

export {
  deployLayout,
  updateScreen
};