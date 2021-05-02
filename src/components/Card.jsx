import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import editIcon from '../images/edit_icon.svg';
import closeIcon from '../images/close_icon.svg';
import { StateContext } from '../App';

import axios from 'axios';

import ArticleForm from './ArticleForm';

function OneCard({ post }) {
  // eslint-disable-next-line
  const [state, dispatch] = React.useContext(StateContext);
  const removeCard = (e) => {
    try {
      if (window.confirm('Вы точно хотите удалить эту статью?')) {
        const apiUrl = `https://5c3755177820ff0014d92711.mockapi.io/articles/${post.id}`;
        axios.delete(apiUrl);
        dispatch({
          type: 'DELETE_ARTICLE',
          payload: state.data.filter((card) => card.id !== post.id),
        });
      }
      e.currentTarget.blur();
    } catch {
      console.log('Something gone wrong');
    }
  };

  return (
    <>
      <Card className="card">
        <Card.Img variant="top" src={post.image} alt="image" />
        <Card.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5>
              <Link
                to={{ pathname: `/article/${post.id}` }}
                onClick={() => {
                  dispatch({
                    type: 'MODAL_VISIBILITY',
                    visibleModal: false,
                    currentPost: post,
                  });
                }}>
                {post.title.length > 20 ? post.title.substring(0, 17) + '...' : post.title}
              </Link>
            </h5>
            <div>
              <Button
                className="mb-2"
                onClick={(e) => {
                  dispatch({
                    type: 'MODAL_VISIBILITY',
                    visibleModal: true,
                    currentPost: post,
                  });
                  e.currentTarget.blur();
                }}
                variant="light">
                <img src={editIcon} alt="edit" style={{ height: '22px', width: '22px' }} />
              </Button>
              <Button className="mb-2" onClick={(e) => removeCard(e)} variant="light">
                <img src={closeIcon} alt="close" style={{ height: '18px', width: '18px' }} />
              </Button>
            </div>
          </div>
          <Card.Text>
            {post.text.length > 100 ? post.text.substring(0, 97) + '...' : post.text}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted text-center">{post.createdAt}</Card.Footer>
      </Card>
      {state.visibleModal && <ArticleForm />}
    </>
  );
}

export default OneCard;
