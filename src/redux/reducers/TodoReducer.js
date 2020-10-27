import {
  GET_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  EDIT_TODO,
  TODO_LOADING,
} from '../types';

const initState = {
  loading: false,
  todos: [],
  todo: {},
  editPopup: false,
};

const TodoReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TODO:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case TODO_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TODO:
      const todos = state.todos.filter(
        (todo) => todo.todoId !== action.payload.todoId
      );
      return {
        ...state,
        todos: [...todos],
      };
    case UPDATE_TODO:
      const filterTodos = state.todos.filter(
        (todo) => todo.todoId !== action.payload.todoId
      );
      return {
        ...state,
        todos: [...filterTodos, action.payload],
      };
    case EDIT_TODO:
      return {
        ...state,
        todo: action.payload,
        editPopup: true,
      };
    default:
      return state;
  }
};

export default TodoReducer;
