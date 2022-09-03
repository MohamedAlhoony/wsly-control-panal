const defaultState = {
  denominationDetails: null,
  isLoading: false,
};

const denominationDetailsPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "denominationDetailsPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "denominationDetailsPage-denominationDetails":
      return {
        ...state,
        denominationDetails: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default denominationDetailsPage_reducer;
