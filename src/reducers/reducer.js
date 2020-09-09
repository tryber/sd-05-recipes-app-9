
const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'REQUEST_DATA':
      return state;
    default:
      return state;
  }
}
