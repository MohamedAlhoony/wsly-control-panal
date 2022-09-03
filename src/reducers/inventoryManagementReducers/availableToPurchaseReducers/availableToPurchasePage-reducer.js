let defaultState = {
    isLoading: false,
    isLoadingMore: false,
    isLoadingAvailable: false,
    showLoadingMoreBtn: true,
    search: '',
    nextTo: 0,
    order: true,
    numOfResults: 10,
    available: [],
    filter: '4',
    numberCart: 0,
    Carts: [],
}

const availableToPurchasePage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'availableToPurchasePage-available':
            return {
                ...state,
                available: action.data,
            }
        case 'availableToPurchasePage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'availableToPurchasePage-isLoadingMore':
            return {
                ...state,
                isLoadingMore: action.data,
            }
        case 'availableToPurchasePage-showLoadingMoreBtn':
            return {
                ...state,
                showLoadingMoreBtn: action.data,
            }
        case 'availableToPurchasePage-isLoadingAvailable':
            return {
                ...state,
                isLoadingAvailable: action.data,
            }
        case 'availableToPurchasePage-search':
            return {
                ...state,
                search: action.data,
            }

        case 'availableToPurchasePage-filter':
            return {
                ...state,
                filter: action.data,
            }
        case 'availableToPurchasePage-nextTo':
            return {
                ...state,
                nextTo: action.data,
            }
        case 'availableToPurchasePage-order':
            return {
                ...state,
                order: action.data,
            }
        case 'availableToPurchasePage-numOfResults':
            return {
                ...state,
                numOfResults: action.data,
            }

        case 'ADD_CART':
            if (state.numberCart == 0) {
                let cart = {
                    id: action.data.Denomination.Id,
                    provider: action.data.Denomination.Providers,
                    quantity: 1,
                    name: action.data.Denomination.Name,
                    brand: action.data.Name,
                }
                state.Carts.push(cart)
            } else {
                let check = false
                state.Carts.map((item, key) => {
                    if (item.id == action.data.Denomination.Id) {
                        state.Carts[key].quantity++
                        check = true
                    }
                })
                if (!check) {
                    let _cart = {
                        id: action.data.Denomination.Id,
                        provider: action.data.Denomination.Providers,
                        quantity: 1,
                        name: action.data.Denomination.Name,
                        brand: action.data.Name,
                    }
                    state.Carts.push(_cart)
                }
            }
            return {
                ...state,
                numberCart: state.numberCart + 1,
            }

        case 'GET_NUMBER_CART':
            return {
                ...state,
            }
        case 'INCREASE_QUANTITY':
            state.numberCart++
            state.Carts[action.data].quantity++
            console.log(state.Carts[action.data].quantity)
            return {
                ...state,
            }
        case 'DECREASE_QUANTITY':
            let quantity = state.Carts[action.data].quantity

            if (quantity > 1) {
                state.numberCart--
                state.Carts[action.data].quantity--
            }

            return {
                ...state,
            }
        case 'DELETE_CART':
            let quantity_ = state.Carts[action.data].quantity
            return {
                ...state,
                numberCart: state.numberCart - quantity_,
                Carts: state.Carts.filter((item) => {
                    return item.id != state.Carts[action.data].id
                }),
            }

        default:
            return {
                ...state,
            }
    }
}

export default availableToPurchasePage_reducer
