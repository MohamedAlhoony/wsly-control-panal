const defaultState = {
  providerDenominationDetails: null,
  isLoading: false,
};

const providerDenominationDetailsPage_reducer = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case "providerDenominationDetailsPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "providerDenominationDetailsPage-providerDenominationDetails":
      return {
        ...state,
        providerDenominationDetails: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default providerDenominationDetailsPage_reducer;
