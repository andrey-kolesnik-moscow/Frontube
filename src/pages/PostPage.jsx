import React from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { StateContext } from '../App';

function PostPage(props) {
  // eslint-disable-next-line
  const [state, dispatch] = React.useContext(StateContext);

  const userID = props.match.params.number;

  React.useEffect(() => {
    if (!state.comments[userID]) {
      // Если еще нет комментов по id юзера
      try {
        const apiCommentsUrl = `https://5c3755177820ff0014d92711.mockapi.io/articles/${props.match.params.number}/comments`;
        axios.get(apiCommentsUrl).then(({ data }) => {
          if (data.length) {
            // если скаченная data содержит хотябы один коммент
            dispatch({
              type: 'ADD_COMMENT',
              payload: data,
              userId: userID,
            });
          }
        });
      } catch {
        console.log('Comments were not downloaded from the server!');
      }
    }
    // eslint-disable-next-line
  }, [userID]);

  return (
    <div className="container">
      <br />
      <br />
      <Link to="/">
        <Button variant="primary">Назад</Button>
      </Link>
      <div>
        <Card className="mt-4">
          <Card.Img variant="top" src={state.currentPost.image} />
          <Card.Body>
            <h5>
              {/* <Link to={{ pathname: `${window.location.pathname}` }}> */}
              {state.currentPost.title}
              {/* </Link> */}
            </h5>
            <Card.Text>{state.currentPost.text}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted text-center">
            {state.currentPost.createdAt}
          </Card.Footer>
        </Card>
        <h3 className="mb-3 mt-4">Комментарии:</h3>
      </div>
      <Card className="mb-4">
        {state.comments[userID] &&
          state.comments[userID].map((item) => (
            <Card.Body key={item.id}>
              <Card.Subtitle className="mb-2 text-muted">{item.name}</Card.Subtitle>
              {item.text}
            </Card.Body>
          ))}
      </Card>
    </div>
  );
}

export default PostPage;
