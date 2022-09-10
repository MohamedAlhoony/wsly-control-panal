let defaultState = {
  isLoading: false,
  products: [],
  filteredProducts: [],
  search: "",
  tableSorting: {
    column: null,
    direction: null,
  },
};

const productsPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "productsPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "productsPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "productsPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "productsPage-products":
      return {
        ...state,
        products: action.data,
      };
    case "productsPage-filteredProducts":
      return {
        ...state,
        filteredProducts: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default productsPage_reducer;
