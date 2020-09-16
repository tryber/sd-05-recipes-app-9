import React from 'react';
import Header from '../components/Header';
import ProfileButton from '../components/ProfileButton';
import BottomMenu from '../components/BottomMenu';

export default function Perfil(props) {
  const email = JSON.parse(localStorage.getItem('user')).email ;
  return (
    <div>
      <Header props={props} />
      <h2 data-testid="profile-email">{email}</h2>
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
      <BottomMenu />
    </div>
  );
}
