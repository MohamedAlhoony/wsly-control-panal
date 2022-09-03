let defaultState = {
    isLoading: false,
    createdBatchData: null,
    providers: {
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
        provider: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'المزود',
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
        cardsFile: {
            element: 'input',
            value: { value: '', filePath: '', name: '' },
            label: true,
            labelText: 'تحميل البطاقات',
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

const createBatchPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'createBatchPage-createdBatchData':
            return {
                ...state,
                createdBatchData: action.data,
            }
        case 'createBatchPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'createBatchPage-providers':
            return {
                ...state,
                providers: action.data,
            }
        case 'createBatchPage-categories':
            return {
                ...state,
                categories: action.data,
            }
        case 'createBatchPage-denominations':
            return {
                ...state,
                denominations: action.data,
            }
        case 'createBatchPage-brands':
            return {
                ...state,
                brands: action.data,
            }
        case 'createBatchPage-category-value':
        case 'createBatchPage-denomination-value':
        case 'createBatchPage-brand-value':
        case 'createBatchPage-provider-value':
        case 'createBatchPage-cardsFile-value':
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
        case 'createBatchPage-category-errorMsg':
        case 'createBatchPage-denomination-errorMsg':
        case 'createBatchPage-brand-errorMsg':
        case 'createBatchPage-provider-errorMsg':
        case 'createBatchPage-cardsFile-errorMsg':
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

export default createBatchPage_reducer
