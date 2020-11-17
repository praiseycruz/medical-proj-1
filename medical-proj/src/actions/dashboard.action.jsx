import { dashboardService } from '../services'
import { dashboardConstants } from '../constants'

export const dashboardAction = {
    count
}

function count() {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            dashboardService.count().then( response => {
                // console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: dashboardConstants.COUNT_REQUEST } }
    function success(countResponse) { return { type: dashboardConstants.COUNT_SUCCESS, countResponse } }
    function failure(error) { return { type: dashboardConstants.COUNT_FAILURE, error } }
}
