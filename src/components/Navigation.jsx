import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { NavLink } from 'react-router-dom';
import ArticleForm from './ArticleForm';

import { StateContext } from '../App';

function Navigation(props) {
  const [state, dispatch] = React.useContext(StateContext);
  const [inputValue, setInputValue] = React.useState('');

  function onSearch() {
    if (inputValue.trim()) {
      dispatch({
        type: 'SEARCH',
        search: '?title=' + inputValue.trim(),
      });
      setInputValue('');
    } else {
      alert('Sorry guys, please, change the request form.');
    }
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#">Мой блог</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to={{ pathname: '/' }} activeClassName="nav-link">
              Главная
            </NavLink>
            <NavLink to={{ pathname: '/about' }} className="nav-link">
              Обо мне
            </NavLink>
          </Nav>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            inline>
            <FormControl
              type="text"
              placeholder="Поиск статьи"
              className="mr-sm-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={() => {
                onSearch();
              }}
              variant="primary">
              Найти
            </Button>
            <Button
              className="ml-2"
              onClick={() => {
                dispatch({
                  type: 'MODAL_VISIBILITY',
                  visibleModal: true,
                });
              }}
              variant="success">
              + Добавить
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      {state.visibleModal && <ArticleForm />}
    </>
  );
}

export default Navigation;
