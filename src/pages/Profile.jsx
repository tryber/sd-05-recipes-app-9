import React from 'react';
import Header from '../components/Header';
import ProfileButton from '../components/ProfileButton';
import BottomMenu from '../components/BottomMenu';
import fotoPerfil from '../images/calado_perfil.jpg';
import './Profile.css';

export default function Perfil(props) {
  const user = JSON.parse(localStorage.getItem('user')) || '';
  return (
    <div>
      <Header props={props} />
      <div className="img">
        <img src={fotoPerfil} alt="perfil"/>
      </div>
      <h2 data-testid="profile-email">{user.email || ''}</h2>
      <div className="buttons">
        <ProfileButton
          content="Receitas Feitas"
          link="/receitas-feitas"
          dataTestId="profile-done-btn"
        />
        <ProfileButton
          content="Receitas Favoritas"
          link="/receitas-favoritas"
          dataTestId="profile-favorite-btn"
        />
        <ProfileButton
          content="Sair"
          link="/"
          dataTestId="profile-logout-btn"
          onClick={() => localStorage.clear()}
        />
      </div>
      <BottomMenu />
    </div>
  );
}
