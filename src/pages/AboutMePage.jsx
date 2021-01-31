import React from 'react';

import Navigation from '../components/Navigation';

import Jumbotron from 'react-bootstrap/Jumbotron';

function AboutMePage() {
  return (
    <div className="container">
      <br />
      <br />
      <Navigation />
      <br />
      <Jumbotron>
        <h1>Добро пожаловать!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling extra attention
          to featured content or information.
        </p>
      </Jumbotron>
    </div>
  );
}

export default AboutMePage;
