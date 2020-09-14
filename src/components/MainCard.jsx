import React from 'react';
import PropTypes from 'prop-types';

class MainCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, image, index } = this.props;

    return (
      <div data-testid={`${index}-recipe-card`}>
        <img src={image} data-testid={`${index}-card-img`} alt="Card" />
        <p data-testid={`${index}-card-name`}>{name}</p>
      </div>
    );
  }
}

MainCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default MainCard;
