
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

export {
  list,
  project,
  folder
};