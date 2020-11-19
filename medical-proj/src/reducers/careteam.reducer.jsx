import { careteamConstants } from '../constants'

var defaultState = {
    careTeamCreate: {
        loading: false,
        success: false,
        error: null,
        careTeam: {}
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
        case careteamConstants.CARETEAM_CREATE_REQUEST:
            var {
                careTeamCreate,
                ...otherState
            } = state
            careTeamCreate.success = false
            careTeamCreate.error = null
            careTeamCreate.loading = true
            state = {
                careTeamCreate,
                ...otherState
            }

            return state
        case careteamConstants.CARETEAM_CREATE_SUCCESS:
            var {
                careTeamCreate,
                ...otherState
            } = state
            careTeamCreate.success = true
            careTeamCreate.loading = false
            careTeamCreate.error = null
            careTeamCreate.careTeam = action.careTeam
            state = {
                careTeamCreate,
                ...otherState
            }
            return state
        case careteamConstants.CARETEAM_CREATE_FAILURE:
            var {
                careTeamCreate,
                ...otherState
            } = state
            careTeamCreate.loading = false
            careTeamCreate.success = false
            careTeamCreate.error = action.error
            state = {
                careTeamCreate,
                ...otherState
            }
            return state
        case patientConstants.FIND_BY_PATIENTID_REQUEST:
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
        case patientConstants.FIND_BY_PATIENTID_SUCCESS:
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
        case patientConstants.FIND_BY_PATIENTID_FAILURE:
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
