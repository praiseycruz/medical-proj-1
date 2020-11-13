import { dashboardConstants } from '../constants'

var defaultState = {
    count: {
        loading: false,
        success: false,
        error: null,
        patientCount: {}
    }
}

export function dashboardPatientCount(state = defaultState, action) {
    console.log("ACTION: ", action)
    switch (action.type) {
        case dashboardConstants.COUNT_REQUEST:
            var {
                count,
                ...otherState
            } = state
            count.success = false
            count.error = null
            count.loading = true
            state = {
                count,
                ...otherState
            }

            return state
        case dashboardConstants.COUNT_SUCCESS:
            var {
                count,
                ...otherState
            } = state
            count.success = true
            count.loading = false
            count.error = null
            count.count = action.countResponse
            state = {
                count,
                ...otherState
            }
            return state
        case dashboardConstants.COUNT_FAILURE:
            var {
                count,
                ...otherState
            } = state
            count.loading = false
            count.success = false
            count.error = action.error
            state = {
                count,
                ...otherState
            }
            return state
        default:
            return state;
    }
};
