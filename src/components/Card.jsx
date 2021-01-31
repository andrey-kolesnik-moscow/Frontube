import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import editIcon from '../images/edit_icon.png';
import closeIcon from '../images/close_icon.png';
import { StateContext } from '../App';

import axios from 'axios';

import AddOrEditArticleForm from './AddOrEditArticleForm';

function OneCard({ user }) {
  // eslint-disable-next-line
  const [users, dispatch] = React.useContext(StateContext);
  function removeCard() {
    try {
      if (window.confirm('Вы точно хотите удалить эту статью?')) {
        const apiUrl = `https://5c3755177820ff0014d92711.mockapi.io/articles/${user.id}`;
        axios.delete(apiUrl);
        dispatch({
          type: 'DELETE_ARTICLE',
          payload: users.data.filter((card) => card.id !== user.id),
        });
      }
    } catch {
      console.log('Something gone wrong');
    }
  }

  return (
    <>
      <Card className="">
        <Card.Img variant="top" src={user.image} />
        <Card.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5>
              <Link
                to={{ pathname: `/article/${user.id}` }}
                onClick={() => {
                  dispatch({
                    type: 'OPEN_CLOSE_MODAL_SET_CURRENT_USER',
                    visibleModal: false,
                    currentUser: user,
                  });
                }}>
                {user.title.length > 20 ? user.title.substring(0, 17) + '...' : user.title}
              </Link>
            </h5>
            <div>
              <Button
                className="mb-2"
                onClick={() => {
                  dispatch({
                    type: 'OPEN_CLOSE_MODAL_SET_CURRENT_USER',
                    visibleModal: true,
                    currentUser: user,
                  });
                }}
                variant="light">
                <img src={editIcon} alt="edit" style={{ height: '20px', width: '20px' }} />
              </Button>
              <Button className="mb-2" onClick={() => removeCard()} variant="light">
                <img src={closeIcon} alt="close" style={{ height: '20px', width: '20px' }} />
              </Button>
            </div>
          </div>
          <Card.Text>
            {user.text.length > 100 ? user.text.substring(0, 97) + '...' : user.text}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted text-center">{user.createdAt}</Card.Footer>
      </Card>
      {users.visibleModal ? <AddOrEditArticleForm /> : null}
    </>
  );
}

export default OneCard;
