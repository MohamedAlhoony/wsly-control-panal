let defaultState = {
    isLoading: false,
    smallestBuyingPrice: null,
    // denominationDetails: null,
    formData: {
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

const updateSubscriptionDenominationPage_reducer = (
    state = defaultState,
    action
) => {
    switch (action.type) {
        case 'updateSubscriptionDenominationPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'updateSubscriptionDenominationPage-smallestBuyingPrice':
            return {
                ...state,
                smallestBuyingPrice: action.data,
            }
        // case 'updateSubscriptionDenominationPage-denominationDetails':
        //     return {
        //         ...state,
        //         denominationDetails: action.data,
        //     }
        case 'updateSubscriptionDenominationPage-price-value':
        case 'updateSubscriptionDenominationPage-ratePrice-value':
        case 'updateSubscriptionDenominationPage-isSelectRatePrice-value':
        case 'updateSubscriptionDenominationPage-isAvailable-value':
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
        case 'updateSubscriptionDenominationPage-price-errorMsg':
        case 'updateSubscriptionDenominationPage-ratePrice-errorMsg':
        case 'updateSubscriptionDenominationPage-isSelectRatePrice-errorMsg':
        case 'updateSubscriptionDenominationPage-isAvailable-errorMsg':
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

export default updateSubscriptionDenominationPage_reducer
