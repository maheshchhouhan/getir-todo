import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';
import { updateTodo, deleteTodo, editTodo } from '../redux/actions/TodoAction';

const TodoItem = ({ todo }) => {
  const { text, deadlineDate, isCompleted, todoId } = todo;
  const deadline = deadlineDate.toDate();

  const reduxDispatch = useDispatch();

  const handleDelete = (todoId) => {
    const confirmation = window.confirm(
      'Do you really want to delete this todo?'
    );
    if (confirmation)
      reduxDispatch(
        deleteTodo(todoId, () => {
          NotificationManager.success('Todo deleted successfully', 'Todo');
        })
      );
  };

  const handleComplete = (todo) => {
    todo.isCompleted = !todo.isCompleted;
    reduxDispatch(
      updateTodo(todo, () => {
        NotificationManager.success(
          `Todo ${
            todo.isCompleted ? `completed` : `un-completed`
          } successfully`,
          'Todo'
        );
      })
    );
  };

  const handleEdit = (todoId) => {
    reduxDispatch(editTodo(todoId));
  };

  return (
    <tr className={isCompleted ? 'strike-through' : ''}>
      <td style={{ width: '50%' }}>{text}</td>
      <td>
        <Moment format='MM/DD/YYYY'>{deadline}</Moment>
      </td>
      <td>
        <Button variant='primary' onClick={() => handleEdit(todoId)}>
          Edit
        </Button>
        <Button
          variant='success'
          className='mx-2'
          onClick={() => handleComplete(todo)}
        >
          {!todo.isCompleted ? 'Complete' : 'Un-Complete'}
        </Button>
        <Button variant='danger' onClick={() => handleDelete(todoId)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};
export default TodoItem;
