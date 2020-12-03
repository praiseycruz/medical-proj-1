import { accordionConstants } from '../constants'

let defaultState = {
    officeSetup: localStorage.getItem('evixia.accordion.officeSetup')!==null ? parseInt(localStorage.getItem('evixia.accordion.officeSetup')) : parseInt(0)
}


export function accordion(state = defaultState, action) {
    switch (action.type) {
        case accordionConstants.SET_OPEN:
            localStorage.setItem('evixia.accordion.officeSetup', parseInt(action.officeSetup))
            return {
                officeSetup: action.officeSetup,
                ...state
            }
        default:
            return state;
    }
}
