import { patientConstants } from '../constants'

var defaultState = {
    items: [],
    item: {},
    sampleData: 'sample',
    filteredItems: []
}

export function device(state = defaultState, action) {
    switch (action.type) {
        case patientConstants.CREATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case patientConstants.CREATE:
            return {
                ...state,
                success: action.success
            };
        case patientConstants.FIND_ALL:
            return {
                ...state,
                loading: false,
                states: action.states
            };
        case patientConstants.FIND_BY_ID:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};
