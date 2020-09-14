import React from 'react';

const Lista = ({ data }) => {
  const { ingredients, measures } = data;
  return (
    <ul>
      {ingredients.map((ingrediente, index) => {
        if (ingrediente === '' || ingrediente === null || ingrediente === undefined) {
          return null;
        }
        return (
          <li key={`${ingrediente}`} data-testid={`${index}-ingredient-name-and-measure`} >
            {`${ingrediente}${(measures[index] === null) ? '' : ` - ${measures[index]}`}`}
          </li>
        );
      })}
    </ul>
  );
};

export default Lista;
