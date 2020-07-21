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
// console.log(store.getState());

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
// générer un reducer objet qui contient plusieurs reducers :
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

/*************** FULL EXAMPLE avec reducer composition ci-dessus ************* */
const { createStore } = Redux;
const store = createStore(todoApp);

const filterLink = ({ filter, currentFilter, children }) => {
  if (filter === currentFilter){
    return <span>{children}</span>
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        store.dispatch({
          type: "SET_VISIBILITY_FILTER",
          filter,
        });
      }}
    >
      {children}
    </a>
  );
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_ACTIVE":
      return todos.filter((t) => !t.completed);
    case "SHOW_COMPLETED":
      return todos.filter((t) => t.completed);
  }
};

let nextTodoId = 0;
class myApp extends React.Component {
  render() {
    const {todos, visibilityFilter} = this.props;
    
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    );
    return (
      <div>
        <input
          ref={(node) => {
            this.input = node;
          }}
        />
        <button
          onClick={() => {
            store.dispatch({
              type: "ADD_TOTO",
              text: this.input.value,
              // et ca c'est une super idée :
              id: nextTodoId++,
            });
            this.input = "";
          }}
        >
          add todo>
        </button>
        <ul>
          {visibleTodos.map((todo, i) => (
            <li
              key={todo.id}
              onClick={store.dispatch({
                type: "TOGGLE_TODO",
                id: todo.id,
              })}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
        <p>
          Show : <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter}>all</FilterLink>
          <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter}>active</FilterLink>
          <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter}>completed</FilterLink>
        </p>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    // entrer le store todo avec get state !!
    <myApp todos={...store.getState()} />,
    document.getElementById("root")
  );
};

store.subscribe(render);
//pour le 1er render :
render();
