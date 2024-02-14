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

// Define hooks
const hooks = {
  init: (vnode) => {
    console.log("init - a vnode has been added	=", vnode);
  },
  insert: (vnode) => {
    console.log("insert - an element has been inserted into the DOM = ", vnode);
  },
  create: (emptyVnode, vnode) => {
    console.log(
      "create - a DOM element has been created based on a vnode=",
      vnode,
      emptyVnode
    );
  },
  update: (oldVnode, vnode) => {
    console.log("update - an element is being updated =", vnode, oldVnode);
  }
};

let state = { count: 0 };

function increment() {
  const value = { count: state.count + 1 };
  return value;
}

function updateView(value) {
  let oldView = template(state);
  let newView = template(value);

  render(oldView, newView);
  state = value;
}

function template(state) {
  const view = h("div#app", [
    h("h1", { hook: hooks }, state.count),
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

function render(oldNode, newNode) {
  container.innerHTML = "";

  patch(toVNode(container), newNode);
}

updateView(state);
