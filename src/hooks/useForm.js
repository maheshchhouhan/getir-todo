import { useReducer } from 'react';

const reducer = (state, action) => {
  const { name, value } = action.payload;
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state,
        [name]: value,
      };
    case 'SET_MULTIPLE_STATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const useForm = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = ({ target: { name, value } }) => {
    dispatch({
      type: 'SET_STATE',
      payload: {
        name,
        value,
      },
    });
  };

  return {
    state,
    dispatch,
    handleChange,
  };
};

export default useForm;
