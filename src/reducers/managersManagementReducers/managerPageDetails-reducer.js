const defaultState = {
  managerDetails: null,
  isLoading: false,
};

const managerDetailsPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "managerDetailsPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "managerDetailsPage-managerDetails":
      return {
        ...state,
        managerDetails: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default managerDetailsPage_reducer;
