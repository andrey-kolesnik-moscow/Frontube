import React from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { StateContext } from '../App';

function PostPage(props) {
  // eslint-disable-next-line
  const [state, dispatch] = React.useContext(StateContext);
  const [input, setInput] = React.useState('');

  const name = 'Супертестировщик';
  const userID = props.match.params.number;

  function loadComments() {
    try {
      const apiCommentsUrl = `https://5c3755177820ff0014d92711.mockapi.io/articles/${props.match.params.number}/comments`;
      axios.get(apiCommentsUrl).then(({ data }) => {
        dispatch({
          type: 'SET_COMMENTS',
          payload: data,
          userId: userID,
        });
      });
    } catch {
      console.log('Comments were not downloaded from the server!');
    }
  }

  function postComment() {
    try {
      const apiCommentsUrl = `https://5c3755177820ff0014d92711.mockapi.io/articles/${props.match.params.number}/comments`;
      axios
        .post(apiCommentsUrl, {
          name,
          text: input,
        })
        .then(() => {
          loadComments();
          setInput('');
        });
    } catch {
      console.log('Your comment wasn`t send to the server!');
    }
  }

  React.useEffect(() => {
    if (!state.comments[userID]) {
      loadComments();
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
            <h5>{state.currentPost.title}</h5>
            <Card.Text>{state.currentPost.text}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted text-center">
            {state.currentPost.createdAt}
          </Card.Footer>
        </Card>
        <h3 className="mb-3 mt-4">Комментарии:</h3>
      </div>
      <div>
        {state.comments[userID] &&
          state.comments[userID].map((item) => (
            <Card className="mb-4" key={item.id}>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{item.name}</Card.Subtitle>
                {item.text}
              </Card.Body>
            </Card>
          ))}
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>{name}: </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button className="mt-3" variant="primary" onClick={postComment}>
              Оставить комментарий
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default PostPage;
