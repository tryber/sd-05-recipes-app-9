import React from 'react';
import PropTypes from 'prop-types';
import './RecomendationCard.css';
import { Link } from 'react-router-dom';

const RecomendationCard = ({ data, index, link }) => {
  const { imagem, title, category, id } = data;
  const center = {
    textAlign: 'center',
  };
  const { bemidas } = link;
  return (
    <Link to={`/${bemidas === 'comidas' ? 'bebidas' : 'comidas'}/${id}`} >
      <div data-testid={`${index}-recomendation-card`} style={center} className="rec-card1">
        <img src={imagem} alt={'recipeIMG'} />
        <h5 style={center}>{category}</h5>
        <h4 data-testid={`${index}-recomendation-title`} style={center}>{title}</h4>
      </div>
    </Link>
  );
};

RecomendationCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationCard;

