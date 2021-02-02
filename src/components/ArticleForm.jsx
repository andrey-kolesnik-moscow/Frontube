import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Loader from '../components/Loader.jsx';

import { StateContext } from '../App';

function ArticleForm() {
  // eslint-disable-next-lines
  const [state, dispatch] = React.useContext(StateContext);
  const initialState = state.currentPost
    ? {
        title: state.currentPost.title,
        text: state.currentPost.text,
        image: state.currentPost.image,
      }
    : {
        title: '',
        text: '',
        image: '',
      };

  const [data, setData] = React.useState(initialState);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  function saveArticle() {
    const isEdditing = state.currentPost;
    try {
      dispatch({
        type: 'CHANGE_LOADING_STATUS',
        isLoading: true,
      });
      const apiUrl = `https://5c3755177820ff0014d92711.mockapi.io/articles${
        isEdditing ? `/${state.currentPost.id}` : ''
      }`;
      axios[isEdditing ? 'put' : 'post'](apiUrl, data).then((resp) => {
        if (resp) {
          dispatch({
            type: isEdditing ? 'CHANGE_ARTICLE' : 'ADD_ARTICLE',
            payload: resp.data,
            visibleModal: false,
          });
        }
      });
    } catch {
      console.log('Something gone wrong');
    }
  }

  return (
    <>
      {state.isLoading ? (
        <Loader />
      ) : (
        <Modal show={state.visibleModal}>
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
                  type: 'MODAL_VISIBILITY',
                  visibleModal: false,
                });
              }}>
              Закрыть
            </Button>
            <Button variant="success" onClick={() => saveArticle()}>
              {state.currentPost ? 'Изменить' : 'Добавить'}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ArticleForm;
