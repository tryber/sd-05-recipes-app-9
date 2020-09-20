import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { fetchMealsThunk, fetchDrinksThunk, fetchIngredientsMealThunk, fetchIngredientsDrinkThunk, isCategoryFiltered } from '../actions/index';
import './Header.css';

const handleClick = (setFetchType, setInitFetch, radio, input, pathname) => {
  setFetchType(pathname.includes('comidas'));
  if (radio === '' || input === '') return alert('Gentileza preencher os campos antes de filtrar!');
  if (radio === 'first' && input.length > 1) return alert('Sua busca deve conter somente 1 (um) caracter');
  return setInitFetch(true);
};

const inputsSearchItens = (input, handleChangeInput, handleChangeRadio,
  setFetchType, setInitFetch, radio, pathname, dispatch) => (
    <div className="search">
      <div className="input-search-button">
        <input
          type="text" value={input}
          onChange={(event) => handleChangeInput(event.target.value)}
          name="search-input" data-testid="search-input" className="search-input"
        />
        <button
          className="search-img"
          data-testid="exec-search-btn"
          onClick={() => {
            dispatch(isCategoryFiltered(false));
            return handleClick(setFetchType, setInitFetch, radio, input, pathname)
          }}
        >
          <img src={searchIcon} alt="Pesquisar" />
        </button>
      </div>
      <div className="radiosAndFilterButton">
        <div className="ingrediente">
          <input
            type="radio" name="radiocheck" id="ingrediente" className="withoutSelector"
            data-testid="ingredient-search-radio" value="ingrediente"
            onChange={(event) => handleChangeRadio(event.target.value)}
          />
          <label htmlFor="ingrediente">Ingrediente</label>
        </div>
        <div className="nome">
          <input
            type="radio" name="radiocheck" value="nome" id="Nome" data-testid="name-search-radio"
            onChange={(event) => handleChangeRadio(event.target.value)} className="withoutSeletor"
          />
          <label htmlFor="Nome">Nome</label>
        </div>
        <div className="first">
          <input
            type="radio" name="radiocheck" value="first" id="first"
            data-testid="first-letter-search-radio" className="withoutSeletor"
            onChange={(event) => handleChangeRadio(event.target.value)}
          />
          <label htmlFor="first">Primeira letra</label>
        </div>
      </div>
      <div className="execButton">

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
  const loadingMeals = useSelector((state) => state.reducerHeaderMeals.loading);
  const loadingDrinks = useSelector((state) => state.reducerHeaderDrinks.loading);
  const dadosDrinks = useSelector((state) => state.reducerHeaderDrinks.data);
  const dadosMeals = useSelector((state) => state.reducerHeaderMeals.data);
  const categoryFiltered = useSelector((state) => state.categoriesReducer.categoryFiltered);
  const { location: { pathname } } = props.props.props;
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
    if (loadingDrinks === false && dadosDrinks.length === 0 && !categoryFiltered) alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    if (loadingMeals === false && dadosMeals.length === 0 && !categoryFiltered) alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    if (loadingMeals === false && dadosMeals.length === 1 && tipo === 'comidas') {
      setPathRedirect(`/comidas/${dadosMeals[0].idMeal}`);
      setRedirect(true);
    }
    if (loadingDrinks === false && dadosDrinks.length === 1 && tipo === 'bebidas') {
      setPathRedirect(`/bebidas/${dadosDrinks[0].idDrink}`);
      setRedirect(true);
    }
  }, [loadingMeals, loadingDrinks, dadosMeals, dadosDrinks, tipo, categoryFiltered]);

  const handleChangeInput = (param) => setInput(param);
  const handleChangeRadio = (param) => setRadio(param);

  if (redirect) return (<Redirect to={pathRedirect} />);
  return inputsSearchItens(input, handleChangeInput, handleChangeRadio,
    setFetchType, setInitFetch, radio, pathname, dispatch);
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
    '/explorar/comidas': 'Explorar Comidas',
    '/explorar/bebidas': 'Explorar Bebidas',
    '/explorar/comidas/ingredientes': 'Explorar Ingredientes',
    '/explorar/bebidas/ingredientes': 'Explorar Ingredientes',
  };
  return obj[pathname];
};

const Header = (props) => {
  const [clickedSearch, setClickedSearch] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [pathRedirect, setPathRedirect] = useState('');
  const [isVisible] = useState(visibilitySearchButton(props.props));
  const toogleClickedSearch = () => setClickedSearch(!clickedSearch);

  const handleProfileClick = () => {
    setRedirect(true);
    setPathRedirect('/perfil');
  };

  if (redirect) return (<Redirect to={pathRedirect} />);
  return (
    <div className="header">
      <div className="topo">
        <div>
          <button
            className="profileButton"
            onClick={handleProfileClick}
          >
            <img src={profileIcon} alt="Perfil" data-testid="profile-top-btn" />
          </button>
        </div>
        <div>
          <h1 data-testid="page-title">{titlePage(props.props)}</h1>
        </div>
        <div className="search-div">
          {isVisible &&
            <button
              onClick={toogleClickedSearch}
            >
              {/* ref1 */}
              <img src={searchIcon} alt="Pesquisar" data-testid="search-top-btn" />
            </button>
          }
        </div>
      </div>
      {(clickedSearch) && <SearchItens props={props} />}
    </div>
  );
};

export default Header;

SearchItens.propTypes = {
  props: PropTypes.objectOf(PropTypes.object).isRequired, //  ref2
};

Header.propTypes = {
  props: PropTypes.objectOf(PropTypes.object).isRequired,
};

//  ref1: https://www.w3schools.com/cssref/pr_class_visibility.asp
//  ref2: https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
