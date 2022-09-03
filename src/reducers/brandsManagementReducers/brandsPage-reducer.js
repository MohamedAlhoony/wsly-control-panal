let defaultState = {
    isLoading: false,
    isLoadingMore: false,
    isLoadingBrands: false,
    showLoadingMoreBtn: true,
    search: '',
    nextTo: 0,
    order: true,
    numOfResults: 10,
    brands: [],
}

const brandsPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'brandsPage-brands':
            return {
                ...state,
                brands: action.data,
            }
        case 'brandsPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'brandsPage-isLoadingMore':
            return {
                ...state,
                isLoadingMore: action.data,
            }
        case 'brandsPage-showLoadingMoreBtn':
            return {
                ...state,
                showLoadingMoreBtn: action.data,
            }
        case 'brandsPage-isLoadingBrands':
            return {
                ...state,
                isLoadingBrands: action.data,
            }
        case 'brandsPage-search':
            return {
                ...state,
                search: action.data,
            }
        case 'brandsPage-nextTo':
            return {
                ...state,
                nextTo: action.data,
            }
        case 'brandsPage-order':
            return {
                ...state,
                order: action.data,
            }
        case 'brandsPage-numOfResults':
            return {
                ...state,
                numOfResults: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default brandsPage_reducer
