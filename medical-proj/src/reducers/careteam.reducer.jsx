import { careteamConstants } from '../constants'

var defaultState = {
    getAll: {
        loading: false,
        careteams: {},
        success: false,
        error: null
    },
    findByPatientId: {
        loading: false,
        success: false,
        error: null,
        careTeam: {}
    },
    appendPractitioner: {
        loading: false,
        success: false,
        error: null,
        careTeam: {}
    },
}

export function careteam(state = defaultState, action) {
    console.log("ACTION: ", action)
    switch (action.type) {
        case careteamConstants.GET_ALL_REQUEST:
            var {
                getAll,
                ...otherState
            } = state

            getAll.loading = true
            getAll.error = null
            getAll.success = false

            state = {
                getAll,
                ...otherState
            }
            return state
        case careteamConstants.GET_ALL_SUCCESS:
            var {
                getAll,
                ...otherState
            } = state

            getAll.loading = false
            getAll.error = null
            getAll.success = true
            getAll.careteams = action.careteams

            state = {
                getAll,
                ...otherState
            }
            return state
        case careteamConstants.GET_ALL_FAILURE:
            var {
                getAll,
                ...otherState
            } = state

            getAll.loading = false
            getAll.error = action.error
            getAll.success = false
            state = {
                getAll,
                ...otherState
            }
            return state
        case careteamConstants.FIND_BY_PATIENTID_REQUEST:
            var {
                findByPatientId,
                ...otherState
            } = state

            findByPatientId.loading = false
            findByPatientId.error = null
            findByPatientId.success = false
            state = {
                findByPatientId,
                ...otherState
            }
            return state
        case careteamConstants.FIND_BY_PATIENTID_SUCCESS:
            var {
                findByPatientId,
                ...otherState
            } = state

            findByPatientId.loading = false
            findByPatientId.error = null
            findByPatientId.success = true
            findByPatientId.careTeam = action.careTeam
            state = {
                findByPatientId,
                ...otherState
            }
            return state
        case careteamConstants.FIND_BY_PATIENTID_FAILURE:
            var {
                findByPatientId,
                ...otherState
            } = state

            findByPatientId.loading = false
            findByPatientId.error = action.error
            findByPatientId.success =false
            state = {
                findByPatientId,
                ...otherState
            }
            return state
        case careteamConstants.APPEND_PRACTITIONER_REQUEST:
            var {
                appendPractitioner,
                ...otherState
            } = state
            appendPractitioner.success = false
            appendPractitioner.error = null
            appendPractitioner.loading = true

            state = {
                appendPractitioner,
                ...otherState
            }

            return state
        case careteamConstants.APPEND_PRACTITIONER_SUCCESS:
            var {
                appendPractitioner,
                ...otherState
            } = state
            appendPractitioner.success = true
            appendPractitioner.loading = false
            appendPractitioner.error = null
            appendPractitioner.careTeam = action.careTeam

            state = {
                appendPractitioner,
                ...otherState
            }
            return state
        case careteamConstants.APPEND_PRACTITIONER_FAILURE:
            var {
                appendPractitioner,
                ...otherState
            } = state
            appendPractitioner.loading = false
            appendPractitioner.success = false
            appendPractitioner.error = action.error

            state = {
                appendPractitioner,
                ...otherState
            }
            return state
        default:
            return state;
    }
};
