import React from 'react';
import axios from 'axios';

import Navigation from '../components/Navigation';
import OneCard from '../components/Card.jsx';
import Loader from '../components/Loader.jsx';

import { StateContext } from '../App';

function FullPostPage() {
  const [users, dispatch] = React.useContext(StateContext);

  React.useEffect(() => {
    try {
      dispatch({
        type: 'CHANGE_LOADING_STATUS',
        isLoading: true,
      });
      const apiUrl = `https://5c3755177820ff0014d92711.mockapi.io/articles`;
      axios.get(apiUrl).then((resp) => {
        const data = resp.data;
        if (data.length !== users.data.length) {
          // исключение удвоения массива при повторной загрузке, то есть чтобы при переходе обратно с postPage массив data не удвоился.
          dispatch({
            type: 'SET_LOADED_ARTICLES',
            payload: data,
            isLoading: false,
          });
        } else {
          dispatch({
            type: 'CHANGE_LOADING_STATUS',
            isLoading: false,
          });
        }
      });
    } catch {
      console.log('Page data downloading has failed!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <br />
      <br />
      <div>
        <Navigation />
        {users.isLoading ? (
          <Loader />
        ) : (
          <div className="mt-4 card-columns">
            {users.data.map((user) => (
              <OneCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FullPostPage;
