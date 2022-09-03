import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchProviderDetails } from "../providersManagementActions/providerDetailsPage-actions";
export const fetchInitialData = (providerID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const [denominations, providerDetails] = await Promise.all([
        fetchProviderDenominations(providerID),
        fetchProviderDetails(providerID),
      ]);
      dispatch({
        type: "providerDenominationsPage-providerDetails",
        data: providerDetails,
      });
      dispatch({
        type: "providerDenominationsPage-denominations",
        data: denominations,
      });
      dispatch({
        type: "providerDenominationsPage-filteredDenominations",
        data: denominations,
      });
      dispatch(denominationsSortBy("created_date"));
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
export const fetchProviderDenominations = (providerID) => {
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
        `${baseURI}/api/Provider/Denomination?provider=${providerID}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.ProviderDenominations);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "providerDenominationsPage-isLoading", data: isLoading });
  };
};

export const updateFilteredResult = () => {
  return (dispatch, getState) => {
    const denominations = getState().providerDenominationsPage_reducer
      .denominations;
    const search = getState().providerDenominationsPage_reducer.search.toLowerCase();
    const filteredDenominations = denominations.filter(
      (denomination) =>
        denomination.Brand.Name.toLowerCase().indexOf(search) !== -1 ||
        String(denomination.BuyingPrice).indexOf(search) !== -1 ||
        denomination.Brand.Denomination.Name.toLowerCase().indexOf(search) !==
          -1
    );
    dispatch({
      type: "providerDenominationsPage-filteredDenominations",
      data: filteredDenominations,
    });
  };
};

const sendRemoveProviderDenomination = (providerID, denominationID) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var urlencoded = new URLSearchParams();
    urlencoded.append("Denomination", denominationID);
    urlencoded.append("Provider", providerID);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `${baseURI}/api/Provider/Denomination/Delete`,
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

export const removeDenomination = (providerID, denomination) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));

      await sendRemoveProviderDenomination(providerID, denomination.Id);
      dispatch(
        layoutActions.alertModal({
          show: true,
          body: `تمت عملية حذف الفئة "${denomination.Name}" من المزود "${
            getState().providerDenominationsPage_reducer.providerDetails?.Name
          }" بنجاح`,
        })
      );

      const denominations = await fetchProviderDenominations(providerID);
      dispatch({
        type: "providerDenominationsPage-denominations",
        data: denominations,
      });
      dispatch({
        type: "providerDenominationsPage-filteredDenominations",
        data: denominations,
      });
      dispatch({
        type: "providerDenominationsPage-tableSorting",
        data: { column: null, direction: null },
      });
      dispatch(denominationsSortBy("created_date"));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

export const denominationsSortBy = (column) => {
  return (dispatch, getState) => {
    let denominations = getState().providerDenominationsPage_reducer.filteredDenominations.slice();
    if (
      column ===
      getState().providerDenominationsPage_reducer.tableSorting.column
    ) {
      dispatch({
        type: "providerDenominationsPage-tableSorting",
        data: {
          column,
          direction:
            getState().providerDenominationsPage_reducer.tableSorting
              .direction === "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "providerDenominationsPage-filteredDenominations",
        data: denominations.reverse(),
      });
      return;
    }
    switch (column) {
      case "deno_name":
        denominations = denominations.sort((a, b) => {
          a = a.Brand.Denomination.Name;
          b = b.Brand.Denomination.Name;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "created_date":
        denominations = denominations.sort((a, b) => {
          a = a.CreatedDate;
          b = b.CreatedDate;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "buying_price":
        denominations = denominations.sort((a, b) => {
          a = a.BuyingPrice;
          b = b.BuyingPrice;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "brand_name":
        denominations = denominations.sort((a, b) => {
          a = a.Brand.Name;
          b = b.Brand.Name;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "providerDenominationsPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "providerDenominationsPage-filteredDenominations",
      data: denominations,
    });
  };
};
