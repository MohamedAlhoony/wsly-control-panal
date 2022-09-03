let defaultState = {
  isLoading: false,
  currencies: [],
  formData: {
    name: {
      element: "input",
      value: "",
      label: true,
      labelText: "الإسم",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        maxLength: 49,
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
        // maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
    priceEffectiveCurrency: {
      element: "input",
      value: "",
      label: true,
      labelText: "العملة المؤثرة على السعر",
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
    walletNumber: {
      element: "input",
      value: "",
      label: true,
      labelText: "رقم المحفظة",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        dir: "ltr",
        maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
    roundDecimalPlaces: {
      element: "input",
      value: "",
      label: true,
      labelText: "التقريب بعد الخانة العشرية",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "number",
        required: true,
        dir: "ltr",
        // placeholder: 'الاسم',
      },
    },
  },
};

const addSubscriptionPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "addSubscriptionPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "addSubscriptionPage-currencies":
      return {
        ...state,
        currencies: action.data,
      };
    case "addSubscriptionPage-name-value":
    case "addSubscriptionPage-currency-value":
    case "addSubscriptionPage-priceEffectiveCurrency-value":
    case "addSubscriptionPage-walletNumber-value":
    case "addSubscriptionPage-roundDecimalPlaces-value":
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
    case "addSubscriptionPage-name-errorMsg":
    case "addSubscriptionPage-currency-errorMsg":
    case "addSubscriptionPage-priceEffectiveCurrency-errorMsg":
    case "addSubscriptionPage-walletNumber-errorMsg":
    case "addSubscriptionPage-roundDecimalPlaces-errorMsg":
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

export default addSubscriptionPage_reducer;
