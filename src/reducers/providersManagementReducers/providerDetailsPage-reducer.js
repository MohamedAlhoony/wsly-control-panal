const defaultState = {
  providerDetails: null,
  isLoading: false,
};

const providerDetailsPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "providerDetailsPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "providerDetailsPage-providerDetails":
      return {
        ...state,
        providerDetails: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default providerDetailsPage_reducer;
