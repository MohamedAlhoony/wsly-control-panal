const defaultState = {
  brandDetails: null,
  isLoading: false,
};

const brandDetailsPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "brandDetailsPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "brandDetailsPage-brandDetails":
      return {
        ...state,
        brandDetails: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default brandDetailsPage_reducer;
