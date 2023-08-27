import * as sc from './componentScreen';
import * as objs from './componentObjs';
import * as layout from './componentLayout';

const actions = {
  ADD: 'ADD',
  //fill...
};

function showProjLists(event, proj) {
  const projDivs = document.querySelectorAll('.sidebar .proj-card');
  sc.updateScreenList(event, proj);
  sc.selectedProject(event);
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

function addProj(event, folder, testName) {
  //get from dialog
  if (testName === undefined) testName = `temp ${Math.floor(Math.random() * 10000)}`;
  objs.addProj(testName);
  sc.updateScreenProj(folder);
  sc.selectedProject();
  
}

function deleteProj(event, folder) {
  const projToDelete = folder.at(sc.projSelected-1);
  //console.log(projToDelete);
  const projExist = document.querySelector('.div-project').nextElementSibling;
  //console.log(projExist);
  if (projExist != null && projToDelete != undefined) {
    objs.delProj(projToDelete);
    sc.updateScreenProj(folder);
    layout.clearLayoutSibling(document.querySelector('.add-list'));
    sc.resetSelect();
    
    if (folder.length > 0) {
      sc.selectedProject();
      sc.updateScreenList(event,
      folder.at(sc.projSelected-1));
    }
  }
  
}

function addList(event, project) {
  console.log(objs.fd.projects.indexOf(project));
  if (objs.fd.projects.indexOf(project) === -1) project = undefined;
  if (project === undefined) {
    //objs.addProj('Default');
    //console.log(projects);
    //sc.updateScreenProj(projects);
    if (objs.fd.projects[0] === undefined)
      addProj(event, objs.fd.projects, `name ${Math.floor(Math.random() * 10000)}`);
    project = objs.fd.projects[0];
  }
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
    case 'DELPRJ':
      //console.log(items[0]);
      deleteProj(event, items[0]);
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