let defaultState = {
    isLoading: false,
    pricingPlanTemplateData: '',
    formData: {
        name: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'الإسم',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                maxLength: 49,
                // placeholder: 'الاسم',
            },
        },
        pricingPlansEntriesFile: {
            element: 'input',
            value: { value: '', filePath: '', name: '' },
            label: true,
            labelText: 'تحميل كيانات خطة التسعير ',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'file',
                required: true,
                dir: 'ltr',
                // maxLength: 12,
                // placeholder: 'الاسم',
            },
        },
    },
}

const updatePricingPlanPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'updatePricingPlanPage-pricingPlanTemplateData':
            return {
                ...state,
                pricingPlanTemplateData: action.data,
            }
        case 'updatePricingPlanPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'updatePricingPlanPage-name-value':
        case 'updatePricingPlanPage-pricingPlansEntriesFile-value':
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
        case 'updatePricingPlanPage-name-errorMsg':
        case 'updatePricingPlanPage-pricingPlansEntriesFile-errorMsg':
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

export default updatePricingPlanPage_reducer
