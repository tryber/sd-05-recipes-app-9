import React from 'react';
import PropTypes from 'prop-types';

const RecomendationCard = ({ data, index }) => {
  const { imagem, title, category } = data;

  return (
    <div className="slide" data-testid={`${index}-recomendation-card`}>
      <h4 data-testid={`${index}-recomendation-title`}>{title}</h4>
      <h5>{category}</h5>
      <img src={imagem} style={{ width: '100%', height: '100%' }} alt={'recipeIMG'} />
    </div>
  );
};

RecomendationCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationCard;
