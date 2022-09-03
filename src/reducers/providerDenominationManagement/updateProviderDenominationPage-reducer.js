let defaultState = {
  isLoading: false,
  currencies: [],
  customFields: [],
  formData: {
    currency: {
      element: "input",
      value: "",
      label: true,
      labelText: "العملة",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        dir: "ltr",
      },
    },
    price: {
      element: "input",
      value: "",
      label: true,
      labelText: "سعر الشراء من المزود",
      errorMsg: "",
      config: {
        autoComplete: "off",
        required: true,
        dir: "ltr",
        type: "number",
        // maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
    providerDenominationId: {
      element: "input",
      value: "",
      label: true,
      labelText: "معرف  الفئة لدى المزود",
      errorMsg: "",
      config: {
        autoComplete: "off",
        required: false,
        dir: "ltr",
        // placeholder: 'الاسم',
      },
    },
    isStockReplaceActive: {
      element: "input",
      value: true,
      label: true,
      labelText: "تفعيل",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        // placeholder: 'الاسم',
      },
    },
  },
};

const updateProviderDenominationPage_reducer = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case "updateProviderDenominationPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "updateProviderDenominationPage-currencies":
      return {
        ...state,
        currencies: action.data,
      };
    case "updateProviderDenominationPage-customFields":
      return {
        ...state,
        customFields: action.data,
      };
    case "updateProviderDenominationPage-price-value":
    case "updateProviderDenominationPage-isStockReplaceActive-value":
    case "updateProviderDenominationPage-providerDenominationId-value":
    case "updateProviderDenominationPage-currency-value":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.data.id]: {
            ...state.formData[action.data.id],
            value: action.data.value,
          },
        },
      };
    case "updateProviderDenominationPage-price-errorMsg":
    case "updateProviderDenominationPage-isStockReplaceActive-errorMsg":
    case "updateProviderDenominationPage-ProviderDenominationId-errorMsg":
    case "updateProviderDenominationPage-currency-errorMsg":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.data.id]: {
            ...state.formData[action.data.id],
            errorMsg: action.data.value,
          },
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default updateProviderDenominationPage_reducer;
