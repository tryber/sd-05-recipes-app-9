import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const disabledStatus = (email, senha) => {
  const valido = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
  if (senha.length > 6 && valido !== null) return false;
  return true;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setDisabled(disabledStatus(email, senha));
  }, [email, senha]); //  ref1

  const handleChange = ({ target }) => {
    if (target.name === 'email') setEmail(target.value);
    if (target.name === 'senha') setSenha(target.value);
  };

  const clickHandler = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/comidas" />;

  return (
    <div>
      <h1>Faça Login</h1>
      <input
        type="text"
        name="email"
        data-testid="email-input"
        onChange={(event) => handleChange(event)}
        value={email}
      />
      <input
        type="password"
        name="senha"
        data-testid="password-input"
        onChange={(event) => handleChange(event)}
        value={senha}
      />
      <button
        data-testid="login-submit-btn"
        disabled={disabled}
        onClick={() => clickHandler()}
      >Entrar</button>
    </div>
  );
};

export default Login;

//  ref1: https://stackoverflow.com/questions/55983047/strange-behavior-of-react-hooks-delayed-data-update
