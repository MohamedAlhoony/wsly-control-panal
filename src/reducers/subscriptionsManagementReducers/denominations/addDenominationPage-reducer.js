let defaultState = {
    isLoading: false,
    smallestBuyingPrice: null,
    providerDenominations: {
        isLoading: false,
        data: [],
    },
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
            element: 'input',
            value: '',
            label: true,
            labelText: 'الصنف',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                dir: 'ltr',
                // maxLength: 12,
                // placeholder: 'الاسم',
            },
        },
        brand: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'العلامة التجارية',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                dir: 'ltr',
                // maxLength: 12,
                // placeholder: 'الاسم',
            },
        },
        denomination: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'الفئة',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                dir: 'ltr',
                // maxLength: 12,
                // placeholder: 'الاسم',
            },
        },
        price: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'السعر',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                required: true,
                dir: 'ltr',
                type: 'number',
                // maxLength: 12,
                // placeholder: 'الاسم',
            },
        },
        ratePrice: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'السعر النسبي',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'number',
                required: false,
                dir: 'ltr',
                maxLength: 10,
                // placeholder: 'الاسم',
            },
        },
        isSelectRatePrice: {
            element: 'input',
            value: false,
            label: true,
            labelText: 'تحديد السعر النسبي',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: false,
                dir: 'ltr',
                maxLength: 10,
                // placeholder: 'الاسم',
            },
        },
        isAvailable: {
            element: 'input',
            value: true,
            label: true,
            labelText: 'تفعيل',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                // placeholder: 'الاسم',
            },
        },
    },
}

const addSubscriptionDenominationPage_reducer = (
    state = defaultState,
    action
) => {
    switch (action.type) {
        case 'addSubscriptionDenominationPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'addSubscriptionDenominationPage-smallestBuyingPrice':
            return {
                ...state,
                smallestBuyingPrice: action.data,
            }
        case 'addSubscriptionDenominationPage-providerDenominations':
            return {
                ...state,
                providerDenominations: action.data,
            }
        case 'addSubscriptionDenominationPage-categories':
            return {
                ...state,
                categories: action.data,
            }
        case 'addSubscriptionDenominationPage-denominations':
            return {
                ...state,
                denominations: action.data,
            }
        case 'addSubscriptionDenominationPage-brands':
            return {
                ...state,
                brands: action.data,
            }
        case 'addSubscriptionDenominationPage-category-value':
        case 'addSubscriptionDenominationPage-denomination-value':
        case 'addSubscriptionDenominationPage-brand-value':
        case 'addSubscriptionDenominationPage-price-value':
        case 'addSubscriptionDenominationPage-ratePrice-value':
        case 'addSubscriptionDenominationPage-isSelectRatePrice-value':
        case 'addSubscriptionDenominationPage-isAvailable-value':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.data.id]: {
                        ...state.formData[action.data.id],
                        value: action.data.value,
                    },
                },
            }
        case 'addSubscriptionDenominationPage-category-errorMsg':
        case 'addSubscriptionDenominationPage-denomination-errorMsg':
        case 'addSubscriptionDenominationPage-brand-errorMsg':
        case 'addSubscriptionDenominationPage-price-errorMsg':
        case 'addSubscriptionDenominationPage-ratePrice-errorMsg':
        case 'addSubscriptionDenominationPage-isSelectRatePrice-errorMsg':
        case 'addSubscriptionDenominationPage-isAvailable-errorMsg':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.data.id]: {
                        ...state.formData[action.data.id],
                        errorMsg: action.data.value,
                    },
                },
            }
        default:
            return {
                ...state,
            }
    }
}

export default addSubscriptionDenominationPage_reducer
