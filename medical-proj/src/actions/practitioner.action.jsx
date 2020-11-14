import { practitionerService } from '../services'
import { practitionerConstants } from '../constants'

export const practitionerAction = {
    create,
    getAll,
}

function create(data) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            practitionerService.create(data).then( response => {
                console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: practitionerConstants.CREATE_REQUEST } }
    function success(practitioner) { return { type: practitionerConstants.CREATE_SUCCESS, practitioner } }
    function failure(error) { return { type: practitionerConstants.CREATE_FAILURE, error } }
}

function getAll(count, skip) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            practitionerService.getAll(count, skip).then( response => {
                console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: practitionerConstants.GET_ALL_REQUEST } }
    function success(practitioners) { return { type: practitionerConstants.GET_ALL_SUCCESS, practitioners } }
    function failure(error) { return { type: practitionerConstants.GET_ALL_FAILURE, error } }
}
