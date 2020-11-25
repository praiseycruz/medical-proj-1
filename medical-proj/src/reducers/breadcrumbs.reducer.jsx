import { breadCrumbsConstants } from '../constants'

let defaultState = {
    history: ['Dashboard'],
    currentPage: 'Dashboard'
}

export function breadCrumbs(state = defaultState, action) {
    switch (action.type) {
        case breadCrumbsConstants.SET_HISTORY:
            return {
                history: action.history,
                ...state
            }

        case breadCrumbsConstants.SET_CURRENT_PAGE:
            return {
                currentPage: action.currentPage,
                ...state
            }
        default:
            return state;
    }
}
