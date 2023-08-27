import * as objs from './componentObjs';
import * as inp from './componentInput';
import * as sc from './componentScreen';
//import * as layout from './componentLayout';
import './style.css';

function controller() {
  //const li = objs.list('default', 'default');
  //const prj = objs.project('Default', li)
  

  //test obj
  


  function addListener() {
    const projDivs = document.querySelectorAll('.sidebar .proj-card');
    projDivs.forEach((projDiv) => {
      projDiv.addEventListener('click', (e) => {
        sc.updateScreenList(e, fd.projects);
      });
    });

    const saveBtns = document.querySelectorAll('#list > .save');
    saveBtns.forEach((saveBtn) => {
      saveBtn.addEventListener('click', (event) => {
        let nameDiv = event.target.parentElement.firstElementChild;
        let descDiv = nameDiv.nextElementSibling;
        let cardId = event.target.parentElement.parentElement
          .parentElement.dataset;

        const selectedList = (fd.projects.filter((proj) => 
          proj.id === cardId.parentid
        ))[0].lists.filter((list) => list.id === cardId.listid);
        
        selectedList.name = nameDiv.innerText;
        selectedList.desc = descDiv.innerText;
        console.log(selectedList);
      });
    });
    
  }

  

  function initialize() {
    objs.addProj('projnametest');
    objs.addProj('project22');
    objs.addList('Default', 'test\ndesc', 'projnametest');
    objs.addList('Default2', 'def2', 'projnametest');
    objs.addList('Default4', 'def34', 'project22');
    //sc.deployLayout();
    sc.initializeScreen(objs.fd.projects);
    //addListener();
  }
  
  return {
    initialize
  }
}

const init = controller()
init.initialize();

//