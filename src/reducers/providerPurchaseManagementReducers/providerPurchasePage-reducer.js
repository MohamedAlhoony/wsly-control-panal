let defaultState = {
  isLoading: false,
  isLoadingProvidersBalance: false,
  showProvidersBalance: true,
  providersBalance: [],
  denominations: [],
  isLoadingDenominations: false,
  filteredDenominations: [],
  search: "",
  filter: 4,
  providerDetails: null,
  tableSorting: {
    column: null,
    direction: null,
  },
  cart: [],
  purchasingResponse: null,
  purchasesModal: {
    show: false,
  },
  cartModal: {
    show: false,
    isLoading: false,
  },
};

const providerPurchasePage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "providerPurchasePage-cartModal":
      return {
        ...state,
        cartModal: { ...state.cartModal, ...action.data },
      };
    case "providerPurchasePage-purchasesModal":
      return {
        ...state,
        purchasesModal: { ...state.purchasesModal, ...action.data },
      };
    case "providerPurchasePage-showProvidersBalance":
      return {
        ...state,
        showProvidersBalance: action.data,
      };
    case "providerPurchasePage-purchasingResponse":
      return {
        ...state,
        purchasingResponse: action.data,
      };
    case "providerPurchasePage-cart":
      return {
        ...state,
        cart: action.data,
      };
    case "providerPurchasePage-providersBalance":
      return {
        ...state,
        providersBalance: action.data,
      };
    case "providerPurchasePage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "providerPurchasePage-providerDetails":
      return {
        ...state,
        providerDetails: action.data,
      };
    case "providerPurchasePage-search":
      return {
        ...state,
        search: action.data,
      };
    case "providerPurchasePage-filter":
      return {
        ...state,
        filter: action.data,
      };
    case "providerPurchasePage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "providerPurchasePage-isLoadingProvidersBalance":
      return {
        ...state,
        isLoadingProvidersBalance: action.data,
      };
    case "providerPurchasePage-isLoadingDenominations":
      return {
        ...state,
        isLoadingDenominations: action.data,
      };
    case "providerPurchasePage-denominations":
      return {
        ...state,
        denominations: action.data,
      };
    case "providerPurchasePage-filteredDenominations":
      return {
        ...state,
        filteredDenominations: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default providerPurchasePage_reducer;
