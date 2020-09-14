import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecomendationCard from './RecomendationCard';

const Recomendations = ({ receitas, loading }) => {
  if (loading) return <div>Loading</div>;
  return (
    <div className="wrapper" >
      {receitas.map((card) => (<RecomendationCard key={card.title} data={card} />))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  receitas: state.recomendation.recomendations,
  loading: state.recomendation.carregando,
});

Recomendations.propTypes = {
  loading: PropTypes.bool.isRequired,
  receitas: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Recomendations);
