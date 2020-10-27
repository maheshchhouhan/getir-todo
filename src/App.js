import { Container, Row, Col } from 'react-bootstrap';
import { NotificationContainer } from 'react-notifications';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <>
      <Container className='my-3'>
        <Row>
          <Col lg={6}>
            <h3>GETIR TODO</h3>
          </Col>
          <Col lg={6} className='text-right'>
            <TodoInput />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <TodoList />
          </Col>
        </Row>
      </Container>
      <NotificationContainer />
    </>
  );
};

export default App;
