let defaultState = {
    isLoading: false,
    isLoadingMore: false,
    isLoadingCategoryBrands: false,
    showLoadingMoreBtn: true,
    search: '',
    nextTo: 0,
    order: true,
    numOfResults: 10,
    categoryDetails: null,
    categoryBrands: [],
    addBrandToCategoryModal: {
        show: false,
        isLoading: false,
        availableToAddBrands: [],
        selectBrandInput: {
            value: '',
            brand: '',
            errorMsg: '',
        },
    },
}

const categoryBrandsPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'categoryBrandsPage-categoryDetails':
            return {
                ...state,
                categoryDetails: action.data,
            }
        case 'categoryBrandsPage-categoryBrands':
            return {
                ...state,
                categoryBrands: action.data,
            }
        case 'categoryBrandsPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'categoryBrandsPage-isLoadingMore':
            return {
                ...state,
                isLoadingMore: action.data,
            }
        case 'categoryBrandsPage-showLoadingMoreBtn':
            return {
                ...state,
                showLoadingMoreBtn: action.data,
            }
        case 'categoryBrandsPage-isLoadingCategoryBrands':
            return {
                ...state,
                isLoadingCategoryBrands: action.data,
            }
        case 'categoryBrandsPage-search':
            return {
                ...state,
                search: action.data,
            }
        case 'categoryBrandsPage-nextTo':
            return {
                ...state,
                nextTo: action.data,
            }
        case 'categoryBrandsPage-order':
            return {
                ...state,
                order: action.data,
            }
        case 'categoryBrandsPage-numOfResults':
            return {
                ...state,
                numOfResults: action.data,
            }
        case 'categoryBrandsPage-addBrandToCategoryModal':
            return {
                ...state,
                addBrandToCategoryModal: action.data,
            }
        case 'categoryBrandsPage-addBrandToCategoryModal-selectBrandInput-brand':
            return {
                ...state,
                addBrandToCategoryModal: {
                    ...state.addBrandToCategoryModal,
                    selectBrandInput: {
                        brand: action.data,
                    },
                },
            }
        case 'categoryBrandsPage-addBrandToCategoryModal-selectBrandInput-errorMsg':
            return {
                ...state,
                addBrandToCategoryModal: {
                    ...state.addBrandToCategoryModal,
                    selectBrandInput: {
                        errorMsg: action.data,
                    },
                },
            }
        default:
            return {
                ...state,
            }
    }
}

export default categoryBrandsPage_reducer
