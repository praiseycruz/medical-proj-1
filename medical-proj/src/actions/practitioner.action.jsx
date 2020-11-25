import { practitionerService } from '../services'
import { practitionerConstants } from '../constants'

export const practitionerAction = {
    create,
    getAll,
    searchByIdOrName,
    getPaginationLink,
}

function create(data) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            practitionerService.create(data).then( response => {
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

function getAll(count, skip, role) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            practitionerService.getAll(count, skip, role).then( response => {
                //console.log(response)
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

function searchByIdOrName(query, count) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            practitionerService.searchByIdOrName(query, count).then( response => {
                console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: practitionerConstants.GET_ALL_REQUEST } }
    function success(patients) { return { type: practitionerConstants.GET_ALL_SUCCESS, patients } }
    function failure(error) { return { type: practitionerConstants.GET_ALL_FAILURE, error } }
}

function getPaginationLink(link, currentPage) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            practitionerService.getPaginationLink(link, currentPage).then( response => {
                // console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: practitionerConstants.GET_ALL_REQUEST } }
    function success(patients) { return { type: practitionerConstants.GET_ALL_SUCCESS, patients } }
    function failure(error) { return { type: practitionerConstants.GET_ALL_FAILURE, error } }
}
