import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { StateContext } from '../App';

function AddOrEditArticleForm() {
  // eslint-disable-next-lines
  const [users, dispatch] = React.useContext(StateContext);
  let initialState;
  users.currentUser
    ? (initialState = {
        title: users.currentUser.title,
        text: users.currentUser.text,
        image: users.currentUser.image,
      })
    : (initialState = {
        title: '',
        text: '',
        image: '',
      });

  const [data, setData] = React.useState(initialState);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  function addOrChangeArticleAndReload() {
    if (users.currentUser) {
      try {
        const apiUrl = `https://5c3755177820ff0014d92711.mockapi.io/articles/${users.currentUser.id}`;
        axios.put(apiUrl, data).then((resp) => {
          if (resp) {
            dispatch({
              type: 'CHANGE_ARTICLE',
              payload: resp.data,
              visibleModal: false,
            });
          }
        });
      } catch {
        console.log('Something gone wrong');
      }
    } else {
      try {
        const apiUrl = `https://5c3755177820ff0014d92711.mockapi.io/articles`;
        axios.post(apiUrl, data).then((resp) => {
          if (resp) {
            dispatch({
              type: 'ADD_ARTICLE',
              payload: resp.data,
              visibleModal: false,
            });
          }
        });
      } catch {
        console.log('Something gone wrong');
      }
    }
  }

  return (
    <Modal show={users.visibleModal}>
      <Modal.Header>
        <Modal.Title>Добавление статьи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Заголовок</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChangeInput}
              name="title"
              value={data.title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Изображение</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChangeInput}
              name="image"
              value={data.image}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Текст</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleChangeInput}
              name="text"
              rows={5}
              value={data.text}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            dispatch({
              type: 'OPEN_CLOSE_MODAL_SET_CURRENT_USER',
              visibleModal: false,
            });
          }}>
          Закрыть
        </Button>
        <Button variant="success" onClick={() => addOrChangeArticleAndReload()}>
          {users.currentUser ? 'Изменить' : 'Добавить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddOrEditArticleForm;
