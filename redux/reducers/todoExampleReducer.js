const initialState = [];

export const todos = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          completed: false,
        },
      ];
    case "TOGGLE_COMPLETED":
      return state.map((todo) => {
        if (todo.id !== action.id) return todo;
        else return { ...todo, completed: !todo.completed };
      });
    default:
      return state;
  }
};

/* SAME AS : Redux composition at different tree node */
export const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        name: action.name,
        completed: false,
      };
    case "TOGGLE_COMPLETED":
      if (state.id !== action.id) return state;
      else return { ...todo, completed: !todo.completed };
    default:
      return state;
  }
};

//then : un reducer peut appeler un autre reducer
export const simplifiedTodos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_COMPLETED":
      return state.map((t) => todo(t, action));

    default:
      return state;
  }
};

//dans App
const { createStore } = Redux;
const store = createStore(todos);
store.dispatch({
  type: "ADD_TODO",
  id: 1,
  text: "go shopping",
});
store.dispatch({
  type: "TOGGLE_TODO",
  id: 5,
});
console.log(store.getState());

/* PLUS LOIN */

// pour combiner des reducers indépendants, pratique pour travailler en team:
const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//   };
// };

// en fait Redux prévoit déjà un truc pour combiner :

const { combineReducers } = Redux;
const todoApp = combineReducers({
  //todos will be updated by todos reducer :
  //todos: todos, to simplify:
  todos,
  //visibilityFilter will be updated by visibilityFilter Reducer :
  // visibilityFilter: visibilityFilter, to simplify :
  visibilityFilter,
}); // result = obj

const { createStore } = Redux;
const store = createStore(todoApp);

// affichera toutes les todos qui ne sont pas encore complétées :
store.dispatch({
  type: "SET_VISIBILITY_FILTER",
  filter: "SHOW_COMPLETED",
});
