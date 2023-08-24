
const actions = {
  ADD: 'ADD',
  //fill...
};

function handleInput(event, actionObj) {
  if (Event.prototype.isPrototypeOf(event)) e = event.target.name;
  else e = 'e is not event';

  switch (e) {
    case actionObj.ADD:
      console.log('call ADD');
      break;
    default:
      console.log(e);
      console.log(Event.prototype.isPrototypeOf(event));
  }
}

export {
  actions,
  handleInput
};