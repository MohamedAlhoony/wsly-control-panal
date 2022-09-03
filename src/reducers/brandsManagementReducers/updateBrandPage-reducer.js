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

const updateBrandPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "updateBrandPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "updateBrandPage-isUploadingBrandImage":
      return {
        ...state,
        isUploadingBrandImage: action.data,
      };
    case "updateBrandPage-subscriptionBrands":
      return {
        ...state,
        subscriptionBrands: action.data,
      };
    case "updateBrandPage-subscriptions":
      return {
        ...state,
        subscriptions: action.data,
      };
    case "updateBrandPage-name-value":
    case "updateBrandPage-nameEn-value":
    case "updateBrandPage-shortDescription-value":
    case "updateBrandPage-longDescription-value":
    case "updateBrandPage-shortDescriptionEn-value":
    case "updateBrandPage-longDescriptionEn-value":
    case "updateBrandPage-URL-value":
    case "updateBrandPage-isAvailable-value":
    case "updateBrandPage-subscription-value":
    case "updateBrandPage-subscriptionBrandRank-value":
    case "updateBrandPage-isSubscriptionBrandAvailable-value":
    case "updateBrandPage-brandImageFile-value":
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
    case "updateBrandPage-name-errorMsg":
    case "updateBrandPage-nameEn-errorMsg":
    case "updateBrandPage-shortDescription-errorMsg":
    case "updateBrandPage-longDescription-errorMsg":
    case "updateBrandPage-shortDescriptionEn-errorMsg":
    case "updateBrandPage-longDescriptionEn-errorMsg":
    case "updateBrandPage-URL-errorMsg":
    case "updateBrandPage-isAvailable-errorMsg":
    case "updateBrandPage-subscription-errorMsg":
    case "updateBrandPage-subscriptionBrandRank-errorMsg":
    case "updateBrandPage-isSubscriptionBrandAvailable-errorMsg":
    case "updateBrandPage-brandImageFile-errorMsg":
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

export default updateBrandPage_reducer;
