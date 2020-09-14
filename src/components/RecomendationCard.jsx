import React from 'react';
import PropTypes from 'prop-types';

const RecomendationCard = ({ data }) => {
  const { imagem, title, category } = data;

  return (
    <div className="slide" >
      <h4>{title}</h4>
      <h5>{category}</h5>
      <img src={imagem} style={{ width: '100%', height: '100%' }} alt={'recipeIMG'} />
    </div>
  );
};

RecomendationCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default RecomendationCard;
