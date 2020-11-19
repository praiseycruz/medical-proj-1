import { careTeamService } from '../services'
import { careTeamConstants } from '../constants'

export const careTeamAction = {
    create,
}

function create() {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            careTeamService.create().then( response => {
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: careTeamConstants.CARETEAM_CREATE_REQUEST } }
    function success(careTeam) { return { type: careTeamConstants.CARETEAM_CREATE_SUCCESS, careTeam } }
    function failure(error) { return { type: careTeamConstants.CARETEAM_CREATE_FAILURE, error } }
}
