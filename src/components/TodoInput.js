import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-notifications/lib/notifications.css';

// importing useForm custom hook to handle state for all forms in our app
import useForm from '../hooks/useForm';

// importing TodoActions
import { addTodo, updateTodo } from '../redux/actions/TodoAction';

const initState = {
  text: '',
  deadlineDate: new Date(),
  isCompleted: false,
};

const TodoInput = () => {
  const { state, handleChange, dispatch } = useForm(initState);
  const { text, deadlineDate } = state;

  const reduxDispatch = useDispatch();

  const { todo, editPopup } = useSelector((state) => state.todos);

  const [show, setShow] = useState(false);

  const handleTodoPopup = () => setShow(!show);

  const handleValidate = () => {
    return new Promise((resolve, reject) => {
      if (text.trim() !== '') resolve(1);
      else reject({ message: 'Please enter text' });
    });
  };

  const handleSubmit = async (isUpdate) => {
    try {
      const isValidated = await handleValidate();
      if (isValidated) {
        if (!isUpdate) {
          // adding new
          reduxDispatch(
            addTodo({ ...state }, () => {
              handleTodoPopup();
              NotificationManager.success('Todo added successfully', 'Todo');
            })
          );
        } else {
          const _todo = { ...todo };
          _todo.text = text;
          _todo.deadlineDate = deadlineDate;
          reduxDispatch(
            updateTodo({ ..._todo }, () => {
              handleTodoPopup();
              NotificationManager.success('Todo updated successfully', 'Todo');
            })
          );
        }
      }
    } catch (e) {
      NotificationManager.error(e.message, 'Todo');
    }
  };

  useEffect(() => {
    if (!show) {
      dispatch({
        type: 'SET_MULTIPLE_STATE',
        payload: { text: '', deadlineDate: new Date() },
      });
    }
  }, [show, dispatch]);

  useEffect(() => {
    if (editPopup && todo) {
      handleTodoPopup();
      const { text, deadlineDate } = todo;
      dispatch({
        type: 'SET_MULTIPLE_STATE',
        payload: { text, deadlineDate: deadlineDate.toDate() },
      });
    }
  }, [editPopup, todo, dispatch]);

  return (
    <>
      <Button variant='primary' onClick={handleTodoPopup}>
        Add Todo
      </Button>

      <Modal show={show} onHide={handleTodoPopup}>
        <Modal.Header closeButton>
          <Modal.Title>{todo.text && text ? 'Edit' : 'Add'} Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                type='text'
                name='text'
                onChange={handleChange}
                value={text}
                placeholder='Enter Text'
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Deadline Date</Form.Label>
              <Row>
                <Col lg={12}>
                  <DatePicker
                    name='deadlineDate'
                    onChange={(date) => {
                      handleChange({
                        target: { name: 'deadlineDate', value: date },
                      });
                    }}
                    placeholder='Deadline Date'
                    className='form-control'
                    selected={deadlineDate}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleTodoPopup}>
            Close
          </Button>
          {!todo.text ? (
            <Button variant='success' onClick={() => handleSubmit(0)}>
              Add
            </Button>
          ) : (
            <Button variant='success' onClick={() => handleSubmit(1)}>
              Update
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoInput;
