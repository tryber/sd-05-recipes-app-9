import React from 'react';
import { connect } from 'react-redux';
import RecomendationCard from './RecomendationCard';

const Recomendations = ({ receitas, loading }) => {
  if (loading) return <div>Loading</div>;
  return (
    <div className="wrapper" >
      {receitas.map((card) => (<RecomendationCard data={card} />))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  receitas: state.recomendation.recomendations,
  loading: state.recomendation.carregando,
});

export default connect(mapStateToProps)(Recomendations);
