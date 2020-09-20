import React from 'react';
import PropTypes from 'prop-types';

const RecomendationCard = ({ data, index }) => {
  const { imagem, title, category } = data;
  const center = {
    textAlign: 'center',
  };
  return (
    <div data-testid={`${index}-recomendation-card`} style={center}>
      <h4 data-testid={`${index}-recomendation-title`} style={center}>{title}</h4>
      <h5 style={center}>{category}</h5>
      <img src={imagem} style={{ width: '100%', height: '100%' }} alt={'recipeIMG'} />
    </div>
  );
};

RecomendationCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationCard;
