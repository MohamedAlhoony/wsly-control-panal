let defaultState = {
    isLoading: false,
    isLoadingMore: false,
    isLoadingPricingPlans: false,
    showLoadingMoreBtn: true,
    search: '',
    nextTo: 0,
    order: true,
    numOfResults: 10,
    pricingPlans: [],
}

const pricingPlansPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'pricingPlansPage-pricingPlans':
            return {
                ...state,
                pricingPlans: action.data,
            }
        case 'pricingPlansPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'pricingPlansPage-isLoadingMore':
            return {
                ...state,
                isLoadingMore: action.data,
            }
        case 'pricingPlansPage-showLoadingMoreBtn':
            return {
                ...state,
                showLoadingMoreBtn: action.data,
            }
        case 'pricingPlansPage-isLoadingPricingPlans':
            return {
                ...state,
                isLoadingPricingPlans: action.data,
            }
        case 'pricingPlansPage-search':
            return {
                ...state,
                search: action.data,
            }
        case 'pricingPlansPage-nextTo':
            return {
                ...state,
                nextTo: action.data,
            }
        case 'pricingPlansPage-order':
            return {
                ...state,
                order: action.data,
            }
        case 'pricingPlansPage-numOfResults':
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

export default pricingPlansPage_reducer
