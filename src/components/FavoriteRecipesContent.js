import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FavoriteRecipesContent.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const FilterButtons = (props) => {
  const { handleClickButton } = props;
  return (
    <div className="filterButtons">
      <button name="All" onClick={handleClickButton} data-testid="filter-by-all-btn">
        All
      </button>
      <button name="comida" onClick={handleClickButton} data-testid="filter-by-food-btn">
        Food
      </button>
      <button name="bebida" onClick={handleClickButton} data-testid="filter-by-drink-btn">
        Drinks
      </button>
    </div>
  );
};

const Card = (props) => {
  const { item, index, setData } = props;

  const handleClickShare = () => {
    copy(`http://localhost:3000/${item.type}s/${item.id}`);
    document.getElementById(`share-btn-${item.id}`).innerHTML = 'Link copiado!';
  };

  const handleClickFavorite = () => {
    const obj = JSON.parse(localStorage.getItem('favoriteRecipes')).filter((remove) => remove.id !== item.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
    setData(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  return (
    <div className="containerCard">
      <div className="left">
        <Link to={`${item.type}s/${item.id}`}>
          <img src={item.image} alt={item.name} data-testid={`${index}-horizontal-image`} />
        </Link>
      </div>
      <div className="right">
        <Link to={`${item.type}s/${item.id}`}>
          <h4 data-testid={`${index}-horizontal-name`}>{item.name}</h4>
        </Link>
        <span data-testid={`${index}-horizontal-top-text`}>{ (item.type === 'comida') ? `${item.area} - ${item.category}` : item.alcoholicOrNot }</span>
        <div className="share-unlike">
          <button id={`share-btn-${item.id}`} onClick={handleClickShare}>
            <img src={shareIcon} alt="Compartilhar" data-testid={`${index}-horizontal-share-btn`} />
          </button>
          <button onClick={handleClickFavorite}>
            <img src={blackHeartIcon} alt="Favorito" data-testid={`${index}-horizontal-favorite-btn`} />
          </button>
        </div>
      </div>
    </div>
  );
};

const FavoriteRecipesContent = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [data, setData] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);

  const handleClickButton = (event) => {
    const { name } = event.target;
    setSelectedFilter(name);
  };

  let array = data;
  if (selectedFilter === 'All') array = data;
  if (selectedFilter === 'comida') array = array.filter((item) => item.type === 'comida');
  if (selectedFilter === 'bebida') array = array.filter((item) => item.type === 'bebida');

  return (
    <div className="conteudo">
      <FilterButtons handleClickButton={handleClickButton} />
      {(array.length > 0) ? array.map((item, index) =>
        <Card key={item.id} item={item} index={index} setData={setData} />) : null}
    </div>
  );
};

export default FavoriteRecipesContent;

Card.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  setData: PropTypes.func.isRequired,
};

FilterButtons.propTypes = {
  handleClickButton: PropTypes.func.isRequired,
};
