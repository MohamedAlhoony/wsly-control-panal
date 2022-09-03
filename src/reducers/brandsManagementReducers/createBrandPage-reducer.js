let defaultState = {
  isLoading: false,
  isUploadingBrandImage: false,
  subscriptionBrands: [],
  subscriptions: [],
  formData: {
    name: {
      element: "input",
      value: "",
      label: true,
      labelText: "الإسم باللغة العربية",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        maxLength: 49,
        // placeholder: 'الاسم',
      },
    },
    nameEn: {
      element: "input",
      value: "",
      label: true,
      labelText: "الإسم باللغة الإنجليزية",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        dir: "ltr",
        maxLength: 49,
        // placeholder: 'الاسم',
      },
    },
    shortDescription: {
      element: "input",
      value: "",
      label: true,
      labelText: "وصف مصغر عربي",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        // required: true,
        maxLength: 249,
        // placeholder: 'الاسم',
      },
    },
    longDescription: {
      element: "input",
      value: "",
      label: true,
      labelText: "وصف مطول عربي",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        // required: true,
        maxLength: 1500,
        // placeholder: 'الاسم',
      },
    },
    shortDescriptionEn: {
      element: "input",
      value: "",
      label: true,
      labelText: "وصف مصغر إنجليزي",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        // required: true,
        dir: "ltr",
        maxLength: 249,
        // placeholder: 'الاسم',
      },
    },
    longDescriptionEn: {
      element: "input",
      value: "",
      label: true,
      labelText: "وصف مطول إنجليزي",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        // required: true,
        dir: "ltr",
        maxLength: 1500,
        // placeholder: 'الاسم',
      },
    },
    URL: {
      element: "input",
      value: "",
      label: true,
      labelText: "عنوان الموقع الإلكتروني",
      errorMsg: "",
      config: {
        autoComplete: "off",
        // required: true,
        dir: "ltr",
        placeholder: "https://example.com/",
      },
    },
    isAvailable: {
      element: "input",
      value: true,
      label: true,
      labelText: "هل ظاهر للمستخدمين؟",
      errorMsg: "",
      config: {
        autoComplete: "off",
        // placeholder: 'الاسم',
      },
    },
    subscription: {
      element: "input",
      value: "",
      label: true,
      labelText: "الإشتراك",
      errorMsg: "",
      config: {
        autoComplete: "off",
        placeholder: "الإشتراك",
      },
    },
    subscriptionBrandRank: {
      element: "input",
      value: "",
      label: true,
      labelText: "التصنيف",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "number",
        placeholder: "التصنيف",
      },
    },
    isSubscriptionBrandAvailable: {
      element: "input",
      value: true,
      label: true,
      labelText: "هل ظاهر في الإشتراك؟",
      errorMsg: "",
      config: {
        autoComplete: "off",
        // placeholder: 'الاسم',
      },
    },
    brandImageFile: {
      element: "input",
      value: { value: "", name: "", data: "", imageId: "", path: "" },
      label: true,
      labelText: "تحميل صورة العلامة التجارية",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "file",
        dir: "ltr",
        // maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
  },
};

const createBrandPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "createBrandPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "createBrandPage-isUploadingBrandImage":
      return {
        ...state,
        isUploadingBrandImage: action.data,
      };
    case "createBrandPage-subscriptionBrands":
      return {
        ...state,
        subscriptionBrands: action.data,
      };
    case "createBrandPage-subscriptions":
      return {
        ...state,
        subscriptions: action.data,
      };
    case "createBrandPage-name-value":
    case "createBrandPage-nameEn-value":
    case "createBrandPage-shortDescription-value":
    case "createBrandPage-longDescription-value":
    case "createBrandPage-shortDescriptionEn-value":
    case "createBrandPage-longDescriptionEn-value":
    case "createBrandPage-URL-value":
    case "createBrandPage-isAvailable-value":
    case "createBrandPage-subscription-value":
    case "createBrandPage-subscriptionBrandRank-value":
    case "createBrandPage-isSubscriptionBrandAvailable-value":
    case "createBrandPage-brandImageFile-value":
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
    case "createBrandPage-name-errorMsg":
    case "createBrandPage-nameEn-errorMsg":
    case "createBrandPage-shortDescription-errorMsg":
    case "createBrandPage-longDescription-errorMsg":
    case "createBrandPage-shortDescriptionEn-errorMsg":
    case "createBrandPage-longDescriptionEn-errorMsg":
    case "createBrandPage-URL-errorMsg":
    case "createBrandPage-isAvailable-errorMsg":
    case "createBrandPage-subscription-errorMsg":
    case "createBrandPage-subscriptionBrandRank-errorMsg":
    case "createBrandPage-isSubscriptionBrandAvailable-errorMsg":
    case "createBrandPage-brandImageFile-errorMsg":
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

export default createBrandPage_reducer;
