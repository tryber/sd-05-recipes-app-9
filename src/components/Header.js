import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';
import { fetchMealsThunk, fetchDrinksThunk, fetchIngredientsMealThunk, fetchIngredientsDrinkThunk } from '../actions/index';

const inputsSearchItens = (input, handleChangeInput, handleChangeRadio, handleClick) => (
  <div>
    <input
      type="text" value={input}
      onChange={(event) => handleChangeInput(event.target.value)}
      name="search-input" data-testid="search-input"
    />
    <div>
      <input
        type="radio" name="radiocheck" id="ingrediente"
        data-testid="ingredient-search-radio" value="ingrediente"
        onChange={(event) => handleChangeRadio(event.target.value)}
      />
      <label htmlFor="ingrediente">Ingrediente</label>
      <input
        type="radio" name="radiocheck" value="nome" id="Nome" data-testid="name-search-radio"
        onChange={(event) => handleChangeRadio(event.target.value)}
      />
      <label htmlFor="Nome">Nome</label>
      <input
        type="radio" name="radiocheck" value="first" id="first"
        data-testid="first-letter-search-radio"
        onChange={(event) => handleChangeRadio(event.target.value)}
      />
      <label htmlFor="first">Primeira letra</label>
      <button data-testid="exec-search-btn" onClick={() => handleClick()}>Filtrar</button>
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
  console.log(dados);
  const { location: { pathname } } = props.props;
  const tipo = (pathname.includes('comidas')) ? 'comidas' : 'bebidas';
  const handleClick = () => {
    setFetchType(pathname.includes('comidas'));
    if (radio === '' || input === '') return alert('Gentileza preencher os campos antes de filtrar!');
    if (radio === 'first' && input.length > 1) return alert('Gentileza digitar apenas uma letra para pesquisar por letra!');
    return setInitFetch(true);
  };

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
  return inputsSearchItens(input, handleChangeInput, handleChangeRadio, handleClick);
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
    <div className="topo">
      <button data-testid="profile-top-btn" onClick={() => handleProfileClick()}>
        <img src={profileIcon} alt="Perfil" />
      </button>

      <span data-testid="page-title">{titlePage(props)}</span>

      <button
        data-testid="search-top-btn" onClick={() => toogleClickedSearch()}
        className={(isVisible) ? 'searchButtonVisible' : 'searchButtonNotVisible'}
      >
        {/* ref1 */}
        <img src={searchIcon} alt="Pesquisar" />
      </button>

      {(clickedSearch) && <SearchItens props={props} />}

    </div>
  );
};

export default Header;

//  ref1: https://www.w3schools.com/cssref/pr_class_visibility.asp
