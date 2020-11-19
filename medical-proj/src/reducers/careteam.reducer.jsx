import { careteamConstants } from '../constants'

var defaultState = {
    careTeamCreate: {
        loading: false,
        success: false,
        error: null,
        careTeam: {}
    }
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
        default:
            return state;
    }
};
