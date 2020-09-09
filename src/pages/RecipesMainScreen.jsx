import React from 'react';
// import PropTypes from 'prop-types';
import BottomMenu from '../components/BottomMenu';
import { fetchMeals } from '../services/api';

class RecipesMainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetchMeals('s', '').then((meals) => console.log(meals));
  }

  render() {
    return (
      <div>
        <BottomMenu />
      </div>
    );
  }
}

RecipesMainScreen.propTypes = {};

export default RecipesMainScreen;
