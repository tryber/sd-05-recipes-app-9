import React from 'react';
import PropTypes from 'prop-types';

const Lista = ({ data }) => {
  const { ingredients, measures } = data;
  return (
    <ul>
      {ingredients.map((ingrediente, index) => {
        const number = index;
        if (ingrediente === '' || ingrediente === null || ingrediente === undefined) {
          return null;
        }
        return (
          <li key={`${ingrediente}${number}`} data-testid={`${index}-ingredient-name-and-measure`} >
            {`${ingrediente}${(measures[index] === '') ? '' : ` - ${measures[index]}`}`}
          </li>
        );
      })}
    </ul>
  );
};

Lista.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Lista;
