let defaultState = {
  isLoading: false,
  currencies: [],
  customFields: [],
  providerDetails: null,
  categories: {
    isLoading: false,
    data: [],
  },
  brands: {
    isLoading: false,
    data: [],
  },
  denominations: {
    isLoading: false,
    data: [],
  },
  formData: {
    category: {
      element: "input",
      value: "",
      label: true,
      labelText: "الصنف",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        dir: "ltr",
        // maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
    brand: {
      element: "input",
      value: "",
      label: true,
      labelText: "العلامة التجارية",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        dir: "ltr",
        // maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
    denomination: {
      element: "input",
      value: "",
      label: true,
      labelText: "الفئة",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        dir: "ltr",
        // maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
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

const addProviderDenominationPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "addProviderDenominationPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "addProviderDenominationPage-currencies":
      return {
        ...state,
        currencies: action.data,
      };
    case "addProviderDenominationPage-customFields":
      return {
        ...state,
        customFields: action.data,
      };
    case "addProviderDenominationPage-categories":
      return {
        ...state,
        categories: action.data,
      };
    case "addProviderDenominationPage-denominations":
      return {
        ...state,
        denominations: action.data,
      };
    case "addProviderDenominationPage-brands":
      return {
        ...state,
        brands: action.data,
      };
    case "addProviderDenominationPage-category-value":
    case "addProviderDenominationPage-denomination-value":
    case "addProviderDenominationPage-brand-value":
    case "addProviderDenominationPage-price-value":
    case "addProviderDenominationPage-isStockReplaceActive-value":
    case "addProviderDenominationPage-providerDenominationId-value":
    case "addProviderDenominationPage-currency-value":
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
    case "addProviderDenominationPage-category-errorMsg":
    case "addProviderDenominationPage-denomination-errorMsg":
    case "addProviderDenominationPage-brand-errorMsg":
    case "addProviderDenominationPage-price-errorMsg":
    case "addProviderDenominationPage-isStockReplaceActive-errorMsg":
    case "addProviderDenominationPage-ProviderDenominationId-errorMsg":
    case "addProviderDenominationPage-currency-errorMsg":
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

export default addProviderDenominationPage_reducer;
