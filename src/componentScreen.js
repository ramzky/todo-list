import * as layout from './componentLayout';
import * as inp from './componentInput';
import * as objs from './componentObjs';

let projSelected = 0;

function resetSelect() {
  projSelected = 0;
}

function deployLayout(folder) {
  layout.createLayout('div', 1,
    document.body,
    ['main-container']);
  layout.createLayout('div', 1,
    document.querySelector('.main-container'),
    ['flex-top-box', 'container']);
  layout.createLayout('div', 2,
    document.querySelector('.container'),
    ['flex-item', 'sidebar'],
    ['flex-item', 'list-panel']);
  layout.createLayout('div', 1,
    document.querySelector('.sidebar'),
    ['div-project']);
  layout.createLayout('button', 1,
    document.querySelector('.sidebar .div-project'),
    ['add-project']);
  document.querySelector('.sidebar .add-project')
    .textContent = 'New';
  document.querySelector('.sidebar .add-project')
    .setAttribute('data-name', 'ADDPRJ');
  document.querySelector('.sidebar .add-project')
    .addEventListener('click', (event) => {
      inp.handleInput(event, folder);
    });
  layout.createLayout('button', 1,
    document.querySelector('.sidebar .div-project'),
    ['delete-project']);
  document.querySelector('.sidebar .delete-project')
    .textContent = 'Remove';
  document.querySelector('.sidebar .delete-project')
    .setAttribute('data-name', 'DELPRJ');
  document.querySelector('.sidebar .delete-project')
    .addEventListener('click', (event) => {
      inp.handleInput(event, folder);
    });
  console.log(folder);
}

function cardCreate(list, ...project) {
  layout.createLayout('div', 1,
    document.querySelector('.list-panel'),
    ['card']);
  layout.createLayout('div', 1,
    document.querySelector('.list-panel > .card:last-child'),
    ['form-container']);
  document.querySelector('.list-panel > .card:last-child')
    .setAttribute('data-listID', list.id);
  document.querySelector('.list-panel > .card:last-child')
    .setAttribute('data-parentID', list.parentid);
  
  const lastCard = '.list-panel > .card:last-child'
  layout.createLayout('form', 1,
    document.querySelector(lastCard + ' .form-container'));
  document.querySelector(lastCard + ' .form-container > form')
    .setAttribute('action', '');
  document.querySelector(lastCard + ' .form-container > form')
    .setAttribute('method', 'post');
  document.querySelector(lastCard + ' .form-container > form')
    .setAttribute('id', 'list');
  
  //inputs
  layout.createLayout('div', 2,
    document.querySelector(lastCard + ' .form-container > form'),
    ['title'],
    ['desc']);
  document.querySelector(lastCard + ' .form-container .title')
    .setAttribute('contenteditable', 'true');
  document.querySelector(lastCard + ' .form-container .title')
    .innerText = list.name;
  document.querySelector(lastCard + ' .form-container .title')
    .setAttribute('data-name', 'SAVE');
  document.querySelector(lastCard + ' .form-container .title')
    .addEventListener('blur', (event) => {
      inp.handleInput(event, list)
    });
  document.querySelector(lastCard + ' .form-container .desc')
    .setAttribute('contenteditable', 'true');
  document.querySelector(lastCard + ' .form-container .desc')
    .innerText = list.desc;
  document.querySelector(lastCard + ' .form-container .desc')
    .setAttribute('data-name', 'SAVE');
  document.querySelector(lastCard + ' .form-container .desc')
    .addEventListener('blur', (event) => {
      inp.handleInput(event, list)
    });
  layout.createLayout('button', 2,
    document.querySelector(lastCard + ' .form-container > form'),
    ['save'],
    ['delete']);
  document.querySelector(lastCard + ' .form-container .save')
    .setAttribute('type', 'button');
  document.querySelector(lastCard + ' .form-container .save')
    .setAttribute('data-name', 'SAVE');
  document.querySelector(lastCard + ' .form-container .save')
    .textContent = '';
  document.querySelector(lastCard + ' .form-container .save')
    .addEventListener('click', (event) => {
      inp.handleInput(event, list)
    });
  document.querySelector(lastCard + ' .form-container .delete')
    .setAttribute('type', 'button');
  document.querySelector(lastCard + ' .form-container .delete')
    .setAttribute('data-name', 'DELETE');
  document.querySelector(lastCard + ' .form-container .delete')
    .textContent = '';
  document.querySelector(lastCard + ' .form-container .delete')
    .addEventListener('click', (event) => {
      inp.handleInput(event, list, project[0])
    });
}

function projCardCreate(prj) {
  layout.createLayout('div', 1,
    document.querySelector('.sidebar'),
    ['proj-card']);
  document.querySelector('.sidebar .proj-card:last-child')
    .setAttribute('data-projID', prj.id);
  document.querySelector('.sidebar .proj-card:last-child')
    .setAttribute('data-name', 'SWAP');
  document.querySelector('.sidebar .proj-card:last-child')
    .innerText = prj.name;
  document.querySelector('.sidebar .proj-card:last-child')
    .addEventListener('click', (event) => {
      inp.handleInput(event, prj);
    });
  document.querySelector('.sidebar .proj-card:last-child')
    .addEventListener('dblclick', (event) => {
      inp.handleInput(event, prj);
      event.target.focus();
    });
  document.querySelector('.sidebar .proj-card:last-child')
    .addEventListener('keydown', (event) => {
      inp.handleInput(event, prj);
      //if (event.key === 'Enter') event.preventDefault();
    });
  document.querySelector('.sidebar .proj-card:last-child')
    .addEventListener('blur', (event) => {
      inp.handleInput(event, prj);
    });
  //console.log(prj);
}

function buttonCreateList(project) {
  layout.createLayout('button', 1,
    document.querySelector('.list-panel'),
    ['add-list']);
  document.querySelector('.list-panel .add-list')
    .textContent = '';
  document.querySelector('.list-panel .add-list')
    .setAttribute('data-name', 'ADDLIST');
  document.querySelector('.list-panel .add-list')
    .addEventListener('click', (event) => {
      inp.handleInput(event, project);
    });
}

function updateScreenList(event, project) {
  console.log(project);
  layout.clearLayout(document.querySelector('.list-panel'));
  buttonCreateList(project);
  //const proj = projects.filter((p) => p.name === event.target.innerText);
  //if (proj.length > 0) {
    project.lists.forEach((list) => {
      //create card
      cardCreate(list, project);
    });
  //}
}

function updateScreenProj(folder) {
  layout.clearLayoutSibling(document.querySelector('.div-project'));
  folder.forEach((prj) => {
    //console.log(prj.name + ' project\n');
    projCardCreate(prj);
  });
}

function selectedProject(event, node) {
  console.log(projSelected);
  const projDivs = document.querySelectorAll('.proj-card');
  projDivs.forEach((projDiv) => {
    projDiv.classList.remove('proj-card-select');
  });
  if (event === null || event === undefined) {
    if (projSelected < 1) {
      document.querySelector('.proj-card')
        .classList.add('proj-card-select');
      projSelected = 1;
    }
    if (projSelected > 0) {
      Array.from(document.querySelector('.sidebar').children)
        .at(projSelected).classList.add('proj-card-select');
    }
  }
  else {
    event.target.classList.add('proj-card-select');
    const sidebarChild = document.querySelector('.sidebar').children;
    const selected = Array.from(sidebarChild).filter((child) => {
      return child === event.target;
    });
    projSelected = Array.from(sidebarChild).indexOf(selected[0]);
    //console.log(event.target);
    console.log(projSelected);

  }
}

function initializeScreen(folder) {
  // console
  folder.forEach((prj) => {
    //console.log(prj.name + ' project\n');
    //console.log(prj);
    prj.lists.forEach((list) => {
      //console.log('\t ' + list.name + ' ' + list.desc + '\n');
    });
  });

  //UI
  deployLayout(folder);
  buttonCreateList(folder[0]);
  folder.forEach((prj) => {
    //console.log(prj);
    projCardCreate(prj);
    //prj.lists.forEach((list) => {
      //create card
      //cardCreate(list);
    //});
    //if (prj.lists.length > 1) cardCreate(prj.lists[0]);
  });
  //console.log(folder);
  if (folder.length > 0) {
    folder[0].lists.forEach((list) => cardCreate(list, folder[0]));
    selectedProject();
  }
}

export {
  deployLayout,
  initializeScreen,
  updateScreenList,
  updateScreenProj,
  selectedProject,
  projSelected,
  resetSelect
};