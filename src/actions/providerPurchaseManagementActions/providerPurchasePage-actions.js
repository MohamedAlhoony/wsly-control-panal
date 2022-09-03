import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
export const fetchInitialData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      dispatch(isLoadingProvidersBalance(true));
      const [providersBalance, denominations] = await Promise.all([
        fetchProvidersBalance(),
        fetchAvailableToPurchaseDenominations({
          search: getState().providerPurchasePage_reducer.search,
          filter: getState().providerPurchasePage_reducer.filter,
        }),
      ]);
      dispatch({
        type: "providerPurchasePage-providersBalance",
        data: providersBalance,
      });
      dispatch({
        type: "providerPurchasePage-denominations",
        data: denominations,
      });
      dispatch({
        type: "providerPurchasePage-filteredDenominations",
        data: denominations,
      });
      dispatch(denominationsSortBy("brand_name"));
      dispatch(isLoadingProvidersBalance(false));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(
        layoutActions.handleHttpError(error, {
          reload: true,
          willGoBack: true,
        })
      );
      dispatch(isLoading(false));
    }
  };
};
export const fetchAvailableToPurchaseDenominations = ({ search, filter }) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      var response = await fetch(
        `${baseURI}/api/Inventory/Denomination/AvailableToPurchase?search=${search}&filter=${filter}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Brands);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const fetchProvidersBalance = () => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      var response = await fetch(
        `${baseURI}/api/Inventory/Provider/Balance`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Providers);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const refreshProvidersBalance = () => {
  return async (dispatch) => {
    try {
      dispatch(isLoadingProvidersBalance(true));
      const providersBalance = await fetchProvidersBalance();
      dispatch({
        type: "providerPurchasePage-providersBalance",
        data: providersBalance,
      });
      dispatch(isLoadingProvidersBalance(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoadingProvidersBalance(false));
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "providerPurchasePage-isLoading", data: isLoading });
  };
};
export const isLoadingProvidersBalance = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "providerPurchasePage-isLoadingProvidersBalance",
      data: isLoading,
    });
  };
};
export const updateFilteredResult = () => {
  return (dispatch, getState) => {
    const denominations = getState().providerPurchasePage_reducer.denominations;
    const search = getState().providerPurchasePage_reducer.search.toLowerCase();
    const filteredDenominations = denominations.filter(
      (denomination) =>
        denomination.Brand.Name.toLowerCase().indexOf(search) !== -1 ||
        String(denomination.BuyingPrice).indexOf(search) !== -1 ||
        denomination.Brand.Denomination.Name.toLowerCase().indexOf(search) !==
          -1
    );
    dispatch({
      type: "providerPurchasePage-filteredDenominations",
      data: filteredDenominations,
    });
  };
};

export const denominationsSortBy = (column) => {
  return (dispatch, getState) => {
    let denominations = getState().providerPurchasePage_reducer.denominations.slice();
    if (
      column === getState().providerPurchasePage_reducer.tableSorting.column
    ) {
      dispatch({
        type: "providerPurchasePage-tableSorting",
        data: {
          column,
          direction:
            getState().providerPurchasePage_reducer.tableSorting.direction ===
            "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "providerPurchasePage-denominations",
        data: denominations.reverse(),
      });
      return;
    }
    switch (column) {
      case "deno_name":
        denominations = denominations.sort((a, b) => {
          a = a.Denomination.Name;
          b = b.Denomination.Name;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "max_quantity":
        denominations = denominations.sort((a, b) => {
          a = a.Denomination.MaximumQuantityLimit;
          b = b.Denomination.MaximumQuantityLimit;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "min_quantity":
        denominations = denominations.sort((a, b) => {
          a = a.Denomination.MinimumQuantityLimit;
          b = b.Denomination.MinimumQuantityLimit;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "supply_quantity":
        denominations = denominations.sort((a, b) => {
          a = a.Denomination.SupplyQuantityLimit;
          b = b.Denomination.SupplyQuantityLimit;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "quantity":
        denominations = denominations.sort((a, b) => {
          a = a.Denomination.Quantity;
          b = b.Denomination.Quantity;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "number_of_requests":
        denominations = denominations.sort((a, b) => {
          a = a.Denomination.NumberOfRequests;
          b = b.Denomination.NumberOfRequests;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "brand_name":
        denominations = denominations.sort((a, b) => {
          a = a.Name;
          b = b.Name;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "providerPurchasePage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "providerPurchasePage-denominations",
      data: denominations,
    });
  };
};

const sortBasedOnBrands = (cart) => {
  return cart.slice().sort((a, b) => {
    a = a.Id;
    b = b.Id;
    return a < b ? -1 : a > b ? 1 : 0;
  });
};

export const getAvailableToPurchaseDenominations = () => {
  return async (dispatch, getState) => {
    const search = getState().providerPurchasePage_reducer.search.trim();
    const filter = getState().providerPurchasePage_reducer.filter;
    dispatch({
      type: "providerPurchasePage-isLoadingDenominations",
      data: true,
    });
    const denominations = await fetchAvailableToPurchaseDenominations({
      search,
      filter,
    });
    dispatch({
      type: "providerPurchasePage-isLoadingDenominations",
      data: false,
    });
    dispatch({
      type: "providerPurchasePage-denominations",
      data: denominations,
    });
    dispatch({
      type: "providerPurchasePage-filteredDenominations",
      data: denominations,
    });
    dispatch({
      type: "providerPurchasePage-tableSorting",
      data: { column: null, direction: null },
    });
    dispatch(denominationsSortBy("brand_name"));
  };
};
export const updateCart = (cart) => {
  return (dispatch, getState) => {
    dispatch({ type: "providerPurchasePage-cart", data: cart });
  };
};
export const getCartItemIndex = (denoID, cart) => {
  return cart.findIndex((item) => item.Denomination.Id === denoID);
};
export const handleItemCartButtonPress = (item) => {
  return (dispatch, getState) => {
    const cart = getState().providerPurchasePage_reducer.cart.slice();
    const itemIndex = getCartItemIndex(item.Denomination.Id, cart);
    if (itemIndex === -1) {
      if (cart.length === 10) {
        return;
      }
      cart.push({
        ...item,
        selected_provider: -1,
        selected_quantity: 1,
      });
    } else {
      cart.splice(itemIndex, 1);
    }
    dispatch(updateCart(sortBasedOnBrands(cart)));
  };
};

export const cartModal = (changedFields) => {
  return (dispatch) => {
    dispatch({ type: "providerPurchasePage-cartModal", data: changedFields });
  };
};
export const changePurchasingResponse = (purchasingResponse) => {
  return (dispatch, getState) => {
    dispatch({
      type: "providerPurchasePage-purchasingResponse",
      data: purchasingResponse,
    });
  };
};
export const purchasesModal = (changedFields) => {
  return (dispatch) => {
    dispatch({
      type: "providerPurchasePage-purchasesModal",
      data: changedFields,
    });
  };
};

export const handleCartItemInputChange = (value, item, id) => {
  return (dispatch, getState) => {
    if (id === "selected_quantity" && !/^[1-9]\d*$/.test(value)) {
      return;
    }
    if (id === "selected_quantity" && value > 10) {
      value = 10;
    }
    const cart = getState().providerPurchasePage_reducer.cart.slice();
    const itemIndex = getCartItemIndex(item.Denomination.Id, cart);
    cart[itemIndex][id] = value;
    dispatch(updateCart(cart));
  };
};
const normalizeCart = (cart) => {
  return [].concat(
    ...cart.map((item) => {
      return [
        {
          Denomination: item.Denomination.Id,
          Provider: item.selected_provider,
          Quantity: item.selected_quantity,
        },
      ];
    })
  );
};
export const sendPurchaseFromProvider = (cart) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      Cart: normalizeCart(cart),
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body,
    };
    try {
      const response = await fetch(
        `${baseURI}/api/Inventory/Provider/Purchase`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const purchase = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(cartModal({ isLoading: true }));
      const response = await sendPurchaseFromProvider(
        getState().providerPurchasePage_reducer.cart
      );
      dispatch(cartModal({ isLoading: false, show: false }));
      dispatch(refreshProvidersBalance());
      dispatch(changePurchasingResponse(response));
      dispatch(purchasesModal({ show: true }));
      dispatch(updateCart([]));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(cartModal({ isLoading: false }));
    }
  };
};
