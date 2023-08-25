import * as objs from './componentObjs';
import * as inp from './componentInput';
import * as sc from './componentScreen';
//import * as layout from './componentLayout';
import './style.css';

function controller() {
  const li = objs.list('default', 'default');
  const prj = objs.project('Default', li)
  const fd = objs.folder(prj);

  // actions/commands...
  function addList(name, desc, projName) {
    newList = objs.list(name, desc);
    projName.projects.push(newList);
  }

  function initialize() {
    sc.updateScreen(fd.projects);
  }
  
  return {
    initialize
  }
}

const init = controller()
init.initialize();

//