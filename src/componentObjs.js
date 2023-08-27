const keyNameObj = 'todolistobj'
let fd;
let listID;
let projID;
if (!localStorage.getItem(keyNameObj)) {
  fd = folder();
  listID = 1000;
  projID = 100;
  saveToLocal(keyNameObj, fd, listID, projID);
} else getFromLocal(keyNameObj);

function saveToLocal(...objs) {
  const obj = {};
  obj.fdSave = fd;
  obj.listIDSave = listID;
  obj.projIDSave = projID;
  localStorage.setItem(keyNameObj, JSON.stringify(obj));
}

function getFromLocal(...objs) {
  const obj = JSON.parse(localStorage.getItem(keyNameObj));
  fd = obj.fdSave;
  listID = obj.listIDSave;
  projID = obj.projIDSave;
}

function list(name, desc) {
  return {
    name,
    desc
  }
}

function project(name, list) {
  const lists = [];
  if (list != undefined) lists.push(list);

  return {
    name,
    lists
  }
}

function folder(project) {
  const projects = [];
  if (project != undefined) projects.push(project);

  return {
    projects
  };
}

// actions/commands...
  function addList(name, desc, projName) {
    const newList = list(name, desc);
    newList.id = listID.toString();
    listID++;

    const proj = fd.projects.filter((project) => project.name === projName);
    if (proj.length > 0) {
      newList.parentid = proj[0].id;
      proj[0].lists.push(newList);
    };
  }

  function addProj(projName) {
    const newProj = project(projName);
    newProj.id = projID.toString();
    projID++;

    fd.projects.push(newProj);
  }

  function delProj(projectObj) {
    const projIndex = fd.projects.indexOf(projectObj);
    fd.projects.splice(projIndex, 1);
    //console.log('deleted ' + projIndex);
  }

export {
  list,
  project,
  folder,
  addList,
  addProj,
  delProj,
  fd,
  saveToLocal
};