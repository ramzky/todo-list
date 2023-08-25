import * as layout from './componentLayout';

function deployLayout() {
  layout.createLayout('div', 1,
    document.body,
    ['main-container']);
  layout.createLayout('div', 1,
    document.querySelector('.main-container'),
    ['flex-top-box', 'container']);
}

function updateScreen(folder) {
  // console
  folder.forEach((prj) => {
    console.log(prj.name + ' project\n');
    prj.lists.forEach((list) => {
      console.log('\t ' + list.name + '\n');
    });
  });
}

export {
  deployLayout,
  updateScreen
};