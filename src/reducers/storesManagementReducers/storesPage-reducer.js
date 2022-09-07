let defaultState = {
  isLoading: false,
  stores: [],
};

const storesPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "storesPage-stores":
      return {
        ...state,
        stores: action.data,
      };
    case "storesPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };

    default:
      return {
        ...state,
      };
  }
};

export default storesPage_reducer;
