import * as sc from './componentScreen';
import * as objs from './componentObjs';

const actions = {
  ADD: 'ADD',
  //fill...
};

function showProjLists(event, proj) {
  const projDivs = document.querySelectorAll('.sidebar .proj-card');
  sc.updateScreenList(event, proj);
}

function saveList(event, list) {
  let nameDiv = event.target.parentElement.firstElementChild;
  let descDiv = nameDiv.nextElementSibling;
  let cardId = event.target.parentElement.parentElement
    .parentElement.dataset;
  console.log(list);
  list.name = nameDiv.innerText;
  list.desc = descDiv.innerText;
  console.log(list);
}

function addProj(event, folder) {
  //get from dialog
  const testprojname = 'new project';
  objs.addProj(testprojname);
  sc.updateScreenProj(folder);
  //console.log(objs.fd.projects);
}

function addList(event, project) {
  objs.addList('', '', project.name);
  sc.updateScreenList(event, project);
  console.log(project.lists);
}

function deleteList(event, list, project) {
  let cardId = event.target.parentElement.parentElement
    .parentElement.dataset;

  const selectedList = (objs.fd.projects.filter((proj) =>
    proj.id === cardId.parentid
  ))[0].lists.indexOf(list);

  (objs.fd.projects.filter((proj) =>
    proj.id === cardId.parentid
  ))[0].lists.splice(selectedList, 1);

  console.log(project);
  sc.updateScreenList(event, project);
  console.log(selectedList);
}

function handleInput(event, ...items) {
  //console.log(proj.lists[0].name);
  let e;
  if (Event.prototype.isPrototypeOf(event)) e = event.target.dataset.name;
  else e = 'e is not event';

  switch (e) {
    case 'SAVE':
      //console.log(items[0]);
      saveList(event, items[0])
      break;
    case 'SWAP':
      //console.log(e);
      showProjLists(event, items[0]);
      break;
    case 'ADDPRJ':
      //console.log(items[0]);
      addProj(event, items[0]);
      break;
    case 'ADDLIST':
      //console.log(items[0]);
      addList(event, items[0]);
      break;
    case 'DELETE':
      //console.log(items[0]);
      deleteList(event, items[0], items[1]);
      break;
    default:
      //console.log(e);
      //console.log(Event.prototype.isPrototypeOf(event));
  }
}

export {
  actions,
  handleInput
};