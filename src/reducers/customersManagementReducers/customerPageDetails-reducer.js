const defaultState = {
  customerDetails: null,
  isLoading: false,
};

const customerDetailsPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "customerDetailsPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "customerDetailsPage-customerDetails":
      return {
        ...state,
        customerDetails: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default customerDetailsPage_reducer;
