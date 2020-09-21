import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FavoriteRecipesContent.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './FavoriteRecipesContent.css';

const copy = require('clipboard-copy');

const FilterButtons = (props) => {
  const { handleClickButton } = props;
  return (
    <div className="filterButtons">
      <button className="filterButton" name="All" onClick={handleClickButton} data-testid="filter-by-all-btn">
        All
      </button>
      <button className="filterButton" name="comida" onClick={handleClickButton} data-testid="filter-by-food-btn">
        Food
      </button>
      <button className="filterButton" name="bebida" onClick={handleClickButton} data-testid="filter-by-drink-btn">
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
    setTimeout(() => {
      document.getElementById(`share-btn-${item.id}`).innerHTML = '';
      document.getElementById(`share-btn-${item.id}`).innerHTML = `<img data-testid={${index}-horizontal-share-btn} src=${shareIcon} alt="share" />`;
    }
    , 3000);
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
        <span data-testid={`${index}-horizontal-top-text`}>{ (item.type === 'comida') ? `${item.area} - ${item.category}` : item.alcoholicOrNot }</span>
        <Link to={`${item.type}s/${item.id}`}>
          <h4 className="fav-name" data-testid={`${index}-horizontal-name`}>{item.name}</h4>
        </Link>
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
