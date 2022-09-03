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

const createPricingPlanPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'createPricingPlanPage-pricingPlanTemplateData':
            return {
                ...state,
                pricingPlanTemplateData: action.data,
            }
        case 'createPricingPlanPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'createPricingPlanPage-name-value':
        case 'createPricingPlanPage-pricingPlansEntriesFile-value':
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
        case 'createPricingPlanPage-name-errorMsg':
        case 'createPricingPlanPage-pricingPlansEntriesFile-errorMsg':
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

export default createPricingPlanPage_reducer
