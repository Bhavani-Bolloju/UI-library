import {
  h,
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  toVNode
} from "snabbdom";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
]);

let state = { count: 1 };

// function updateState(state) {
//   return { ...state, count: state.count + 1 }; // Create a new state object with updated count
// }

function increment() {
  const value = { count: state.count + 1 };
  return value;
}

function updateView(value) {
  let oldView = template(state);
  let newView = template(value);

  console.log(oldView, newView);
  render(oldView, newView);
  state = value;

  //should increment state

  //should update the view - call render function
}

function template(state) {
  const view = h("div#app", [
    h("h1", state.count),
    h(
      "button",
      {
        on: {
          click: () => {
            const value = increment();
            updateView(value);
          }
        }
      },
      "Add"
    )
  ]);

  return view;
}

const container = document.getElementById("app");

// function render(oldNode, newNode) {
//   container.innerHTML = "";

//   patch(toVNode(container), newNode);
// }

// render(container, template(state));

function render(oldNode, newNode) {
  container.innerHTML = "";

  patch(toVNode(container), newNode);
}

render(container, template(state));
