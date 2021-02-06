import React from 'react';
import axios from 'axios';

import Navigation from '../components/Navigation';
import OneCard from '../components/Card.jsx';
import Loader from '../components/Loader.jsx';

import { StateContext } from '../App';

function HomePage() {
  const [state, dispatch] = React.useContext(StateContext);

  React.useEffect(() => {
    try {
      dispatch({
        type: 'CHANGE_LOADING_STATUS',
        isLoading: true,
      });
      const apiUrl = `https://5c3755177820ff0014d92711.mockapi.io/articles${state.search}`;
      dispatch({
        type: 'SEARCH',
        search: '',
      });
      axios.get(apiUrl).then(({ data }) => {
        dispatch({
          type: 'SET_ARTICLES',
          payload: data,
        });
      });
    } catch {
      console.log('Page data downloading has failed!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.search]);

  return (
    <div className="container">
      <br />
      <br />
      <div>
        <Navigation />
        {state.isLoading ? (
          <Loader />
        ) : (
          <div className="mt-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4">
            {state.data.map((post) => (
              <div className="col" key={post.id}>
                <OneCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
