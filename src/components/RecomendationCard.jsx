import React from 'react';
import PropTypes from 'prop-types';
import './RecomendationCard.css';

const RecomendationCard = ({ data, index }) => {
  const { imagem, title, category } = data;
  const center = {
    textAlign: 'center',
  };
  return (
    <div data-testid={`${index}-recomendation-card`} style={center} className="rec-card1">
      <img src={imagem} alt={'recipeIMG'} />
      <h5 style={center}>{category}</h5>
      <h4 data-testid={`${index}-recomendation-title`} style={center}>{title}</h4>
    </div>
  );
};

RecomendationCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationCard;
