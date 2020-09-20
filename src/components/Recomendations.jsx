import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import RecomendationCard from './RecomendationCard';

const Recomendations = ({ receitas, loading }) => {
  if (loading) return <div>Loading</div>;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {receitas.map((receita, index) => {
          const number = index;
          return <RecomendationCard key={receitas[number].id} data={receita} index={index} />;
        })}
      </Slider>
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
