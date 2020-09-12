import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { fetchMealsThunk, fetchDrinksThunk, fetchIngredientsMealThunk, fetchIngredientsDrinkThunk } from '../actions/index';
import './Header.css';

const handleClick = (setFetchType, setInitFetch, radio, input, pathname) => {
  setFetchType(pathname.includes('comidas'));
  if (radio === '' || input === '') return alert('Gentileza preencher os campos antes de filtrar!');
  if (radio === 'first' && input.length > 1) return alert('Gentileza digitar apenas uma letra para pesquisar por letra!');
  return setInitFetch(true);
};

const inputsSearchItens = (input, handleChangeInput, handleChangeRadio,
  setFetchType, setInitFetch, radio, pathname) => (
    <div className="search">
      <input
        type="text" value={input}
        onChange={(event) => handleChangeInput(event.target.value)}
        name="search-input" data-testid="search-input"
      />
      <div className="radiosAndFilterButton">
        <div className="ingrediente">
          <input
            type="radio" name="radiocheck" id="ingrediente"
            data-testid="ingredient-search-radio" value="ingrediente"
            onChange={(event) => handleChangeRadio(event.target.value)}
          />
          <label htmlFor="ingrediente">Ingrediente</label>
        </div>
        <div className="nome">
          <input
            type="radio" name="radiocheck" value="nome" id="Nome" data-testid="name-search-radio"
            onChange={(event) => handleChangeRadio(event.target.value)}
          />
          <label htmlFor="Nome">Nome</label>
        </div>
        <div className="first">
          <input
            type="radio" name="radiocheck" value="first" id="first"
            data-testid="first-letter-search-radio"
            onChange={(event) => handleChangeRadio(event.target.value)}
          />
          <label htmlFor="first">Primeira letra</label>
        </div>
      </div>
      <div className="execButton">
      <button
        data-testid="exec-search-btn"
        onClick={() => handleClick(setFetchType, setInitFetch, radio, input, pathname)}
      >
        Filtrar
      </button>
      </div>
    </div>
);

const SearchItens = (props) => {
  const [input, setInput] = useState('');
  const [radio, setRadio] = useState('');
  const [fetchType, setFetchType] = useState(null);
  const [initFetch, setInitFetch] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [pathRedirect, setPathRedirect] = useState('');
  const loading = useSelector((state) => state.reducerHeader.loading);
  const dados = useSelector((state) => state.reducerHeader.data);
  const { location: { pathname } } = props.props;
  const tipo = (pathname.includes('comidas')) ? 'comidas' : 'bebidas';
  const dispatch = useDispatch();

  useEffect(() => {
    if (initFetch === true) {
      let request;
      if (radio === 'nome' && fetchType) request = fetchMealsThunk('s', input);
      if (radio === 'nome' && !fetchType) request = fetchDrinksThunk('s', input);
      if (radio === 'ingrediente' && fetchType) request = fetchIngredientsMealThunk(input);
      if (radio === 'ingrediente' && !fetchType) request = fetchIngredientsDrinkThunk(input);
      if (radio === 'first' && fetchType) request = fetchMealsThunk('f', input);
      if (radio === 'first' && !fetchType) request = fetchDrinksThunk('f', input);
      dispatch(request);
      setInitFetch(false);
    }
  }, [initFetch, fetchType, dispatch, input, radio]);

  useEffect(() => {
    if (loading === false && dados.length === 0) alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    if (loading === false && dados.length === 1 && tipo === 'comidas') {
      setPathRedirect(`/comidas/${dados[0].idMeal}`);
      setRedirect(true);
    }
    if (loading === false && dados.length === 1 && tipo === 'bebidas') {
      setPathRedirect(`/bebidas/${dados[0].idDrink}`);
      setRedirect(true);
    }
  }, [loading, dados, tipo]);

  const handleChangeInput = (param) => setInput(param);
  const handleChangeRadio = (param) => setRadio(param);

  if (redirect) return (<Redirect to={pathRedirect} />);
  return inputsSearchItens(input, handleChangeInput, handleChangeRadio,
    setFetchType, setInitFetch, radio, pathname);
};

const visibilitySearchButton = (props) => {
  const { location: { pathname } } = props;
  const arrayVisible = ['/comidas', '/bebidas',
    '/explorar/comidas/area', '/explorar/bebidas/area'];
  return arrayVisible.includes(pathname);
};

const titlePage = (props) => {
  const { location: { pathname } } = props;
  const obj = {
    '/comidas': 'Comidas',
    '/bebidas': 'Bebidas',
    '/explorar/comidas/area': 'Explorar Origem',
    '/explorar/bebidas/area': 'Explorar Origem',
    '/perfil': 'Perfil',
    '/receitas-feitas': 'Receitas Feitas',
    '/receitas-favoritas': 'Receitas Favoritas',
    '/explorar': 'Explorar',
    'explorar/comidas': 'Explorar Comidas',
    '/explorar/bebidas': 'Explorar Bebidas',
    '/explorar/comidas/ingredientes': 'Explorar ingredientes',
    '/explorar/bebidas/ingredientes': 'Explorar ingredientes',
  };
  return obj[pathname];
};

const Header = (props) => {
  const [clickedSearch, setClickedSearch] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [pathRedirect, setPathRedirect] = useState('');
  const [isVisible] = useState(visibilitySearchButton(props));
  const toogleClickedSearch = () => setClickedSearch(!clickedSearch);

  const handleProfileClick = () => {
    setRedirect(true);
    setPathRedirect('/perfil');
  };

  if (redirect) return (<Redirect to={pathRedirect} />);
  return (
    <div>
      <div className="topo">
        <button
          className="profileButton" data-testid="profile-top-btn"
          onClick={() => handleProfileClick()}
        >
          <img src={profileIcon} alt="Perfil" />
        </button>

        <span data-testid="page-title"><h1>{titlePage(props)}</h1></span>

        <button
          data-testid="search-top-btn" onClick={() => toogleClickedSearch()}
          className={(isVisible) ? 'searchButtonVisible' : 'searchButtonNotVisible'}
        >
          {/* ref1 */}
          <img src={searchIcon} alt="Pesquisar" />
        </button>
      </div>
      {(clickedSearch) && <SearchItens props={props} />}
    </div>
  );
};

export default Header;

//  ref1: https://www.w3schools.com/cssref/pr_class_visibility.asp

SearchItens.propTypes = {
  props: PropTypes.node.isRequired,
};
