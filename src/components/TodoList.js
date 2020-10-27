import { useEffect } from 'react';
import TodoItem from './TodoItem';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector, useDispatch } from 'react-redux';
// import redux todo actions
import { getTodos } from './../redux/actions/TodoAction';

const TodoList = () => {
  const reduxDispatch = useDispatch();
  const { todos, loading } = useSelector((state) => state.todos);

  useEffect(() => {
    // fetching all todos on componentDidMount
    reduxDispatch(getTodos());
  }, [reduxDispatch]);

  // to handle filter options and populating data accordingly
  const handleFilter = ({ target: { value: isCompleted } }) => {
    if (isCompleted !== '') {
      reduxDispatch(getTodos(isCompleted));
    }
  };

  return (
    <div className='my-4'>
      <div className='row'>
        <div className='col-md-2 float-right pull-right text-right'>
          <Form.Group controlId='exampleForm.ControlSelect1'>
            <Form.Control as='select' onChange={handleFilter}>
              <option value='all'>All</option>
              <option value={1}>Completed</option>
              <option value={0}>Un-Completed</option>
            </Form.Control>
          </Form.Group>
        </div>
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Todo</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan='100%' className='text-center'>
                <Spinner animation='border' role='status'>
                  <span className='sr-only'>Loading...</span>
                </Spinner>
              </td>
            </tr>
          ) : todos.length ? (
            todos.map((todo) => <TodoItem key={todo.todoId} todo={todo} />)
          ) : (
            <tr>
              <td colSpan='100%' className='text-center'>
                No todos found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default TodoList;
