import {
  GET_TODO,
  DELETE_TODO,
  TODO_LOADING,
  EDIT_TODO,
  RESET_TODO,
} from '../types';
import { firebase } from '../../firebase';

export const getTodos = (isCompleted) => async (dispatch) => {
  dispatch({
    type: TODO_LOADING,
  });

  let snapshot;
  if (isCompleted !== undefined && isCompleted !== 'all') {
    const completed = isCompleted === '1' ? true : false;
    snapshot = await firebase
      .firestore()
      .collection('todos')
      .orderBy('createdAt', 'desc')
      .where('isCompleted', '==', completed)
      .get();
  } else {
    snapshot = await firebase
      .firestore()
      .collection('todos')
      .orderBy('createdAt', 'desc')
      .get();
  }

  const todos = snapshot.docs.map((todo) => ({
    ...todo.data(),
    todoId: todo.id,
  }));

  dispatch({
    type: GET_TODO,
    payload: todos,
  });
};

export const editTodo = (todoId) => async (dispatch) => {
  const snapshot = await firebase
    .firestore()
    .collection('todos')
    .doc(todoId)
    .get();

  dispatch({
    type: EDIT_TODO,
    payload: { ...snapshot.data(), todoId },
  });
};

export const addTodo = (todo, cb) => async (dispatch) => {
  const deadlineDate = new Date(todo.deadlineDate);
  const createdAt = new Date();
  const newTodo = await firebase
    .firestore()
    .collection('todos')
    .add({ ...todo, deadlineDate, createdAt });

  if (newTodo) {
    dispatch(getTodos());
    cb();
  }
};

export const updateTodo = (todo, cb) => async (dispatch) => {
  const { todoId } = todo;
  console.log({ todo });
  await firebase
    .firestore()
    .collection('todos')
    .doc(todoId)
    .set({ ...todo });

  dispatch(getTodos());

  if (cb) cb();
};

export const deleteTodo = (todoId, cb) => async (dispatch) => {
  await firebase.firestore().collection('todos').doc(todoId).delete();
  dispatch({
    type: DELETE_TODO,
    payload: { todoId },
  });
  cb();
};

export const resetTodo = () => {
  return {
    type: RESET_TODO,
  };
};
