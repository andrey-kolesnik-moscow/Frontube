import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { NavLink } from 'react-router-dom';
import AddOrEditArticleForm from './AddOrEditArticleForm';

import { StateContext } from '../App';

function Navigation(props) {
  const [users, dispatch] = React.useContext(StateContext);

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
          <Form inline>
            <FormControl type="text" placeholder="Поиск статьи" className="mr-sm-2" />
            <Button onClick={() => {}} variant="primary">
              Найт
            </Button>
            <Button
              className="ml-2"
              onClick={() => {
                dispatch({
                  type: 'OPEN_CLOSE_MODAL_SET_CURRENT_USER',
                  visibleModal: true,
                });
              }}
              variant="success">
              + Добавить
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      {users.visibleModal ? <AddOrEditArticleForm /> : null}
    </>
  );
}

export default Navigation;