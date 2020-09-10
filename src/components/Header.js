import React, { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg'

const searchItens = () => {
  return (
    <div>
      <input type="text" name="search-input" data-testid="search-input" />
      <input type="radio" name="radiocheck" id="ingrediente" data-testid="ingredient-search-radio" />
      <label htmlFor="ingrediente">Ingrediente</label>
      <input type="radio" name="radiocheck" id="Nome" data-testid="name-search-radio" />
      <label htmlFor="Nome">Nome</label>
      <input type="radio" name="radiocheck" id="first" data-testid="first-letter-search-radio" />
      <label htmlFor="first">Primeira letra</label>
      <button data-testid="exec-search-btn">Filtrar</button>
    </div>
  );
};

const Header = (props) => {
  const [ clickedSearch, setClickedSearch ] = useState(false);
  console.log(props);
  const toogleClickedSearch = () => {
    setClickedSearch(!clickedSearch);
  };

  return (
    <div className="topo">
      <button data-testid="profile-top-btn">
        <img src={profileIcon} alt="Perfil" />
      </button>

      <span data-testid="page-title">Page title</span>

      <button data-testid="search-top-btn" onClick={() => toogleClickedSearch()} >
        <img src={searchIcon} alt="Pesquisar" />
      </button>

      {(clickedSearch) ? searchItens() : null}

    </div>
  );
};

export default Header;