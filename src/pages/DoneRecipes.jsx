import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const copyText = (type, id) => {
  const link = `http://localhost:3000/${type}s/${id}`;
  document.getElementById(`share-btn-${id}`).innerText = 'Link copiado!';
  copy(link);
};

function Card({ recipe, index }) {
  const { id, image, type, area, alcoholicOrNot, category, name, doneDate, tags } = recipe;
  return (
    <div>
      <Link to={`/${type}s/${id}`}>
        <img data-testid={`${index}-horizontal-image`} src={image} alt="recipe" />
      </Link>
      <div>
        {
          type === 'comida' ?
            <p data-testid={`${index}-horizontal-top-text`}>{`${area} - ${category}`}</p> :
            <p data-testid={`${index}-horizontal-top-text`}>{`${alcoholicOrNot} - ${category}`}</p>
        }
        <button id={`share-btn-${id}`} onClick={() => copyText(type, id)}>
          <img data-testid={`${index}-horizontal-share-btn`} src={shareIcon} alt="share" />
        </button>
        <Link to={`${type}s/${id}`}>
          <p data-testid={`${index}-horizontal-name`}>{name}</p>
        </Link>
        <p data-testid={`${index}-horizontal-done-date`}>Feita em: {doneDate}</p>
        {tags.map((tagName) => <p data-testid={`${index}-${tagName}-horizontal-tag`} key={tagName}>{tagName}</p>)}
      </div>
    </div>
  );
}

function FilterButtons(props) {
  const { setFilter } = props;
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        name="All"
        onClick={(event) => setFilter(event.target.name)}
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        name="comida"
        onClick={(event) => setFilter(event.target.name)}
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        name="bebida"
        onClick={(event) => setFilter(event.target.name)}
      >
        Drink
      </button>
    </div>
  );
}

function filterRecipes(recipes, filter) {
  return (
    recipes && filter !== 'All' ?
      recipes.filter((recipe) => recipe.type === filter) :
      recipes
  );
}

export default function DoneRecipes(props) {
  const [filter, setFilter] = useState('All');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  return (
    <div>
      <Header props={props} />
      <FilterButtons setFilter={setFilter} />
      {
        filterRecipes(doneRecipes, filter).map((recipe, index) =>
          <Card recipe={recipe} index={index} key={recipe.id} />)
      }
    </div>
  );
}

Card.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

FilterButtons.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
