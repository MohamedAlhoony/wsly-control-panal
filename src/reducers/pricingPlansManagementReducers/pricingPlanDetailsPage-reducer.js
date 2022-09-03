const defaultState = {
    pricingPlanDetails: null,
    isLoading: false,
}

const pricingPlanDetailsPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'pricingPlanDetailsPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'pricingPlanDetailsPage-pricingPlanDetails':
            return {
                ...state,
                pricingPlanDetails: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default pricingPlanDetailsPage_reducer
