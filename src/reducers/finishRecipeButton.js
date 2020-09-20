import { FULL } from '../actions/finishRecipeButton';

const ESTADO_INICIAL = {
  finishButton: false,
};

export default function valorDoDisabled(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case FULL:
      return { finishButton: action.estado };
    default:
      return state;
  }
}
