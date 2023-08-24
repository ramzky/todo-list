
function todoList(name, desc) {
  const todoObj = {};

  todoObj.name = name;
  todoObj.desc = desc;

  return todoObj;
}

function project(name, todoList) {
  const projectObj = {};

  const projects = [];
  projects.push(todoList);
  projectObj.name = name;
  projectObj.projects = projects.concat(projects);

  return projectObj;
}

export {
  todoList,
  project
};