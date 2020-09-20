import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const copyText = (pathname) => {
  // copia o link da pagina atual
  const linkPaths = pathname.split('/');
  const link = `http://localhost:3000/${linkPaths[1]}/${linkPaths[2]}`;
  document.getElementById('share-btn').innerText = 'Link copiado!';
  copy(link);
};

const ShareButton = ({ pathname }) => (
  <button id="share-btn" onClick={() => copyText(pathname)} >
    <img data-testid="share-btn" src={shareIcon} alt="share" />
  </button>
);

ShareButton.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default ShareButton;
