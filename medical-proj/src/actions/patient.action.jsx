import { patientService } from '../services'
import { patientConstants } from '../constants'

export const patientAction = {
    create,
    getAll,
    getPaginationLink,
    searchByIdOrName,
    appendPractitionerToPatient,
    // getPreviousPage
}

function create({patientData, physicianId, careManagerId, deviceIds}) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            patientService.create(patientData, physicianId, careManagerId, deviceIds).then( response => {
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: patientConstants.CREATE_REQUEST } }
    function success(patient) { return { type: patientConstants.CREATE_SUCCESS, patient } }
    function failure(error) { return { type: patientConstants.CREATE_FAILURE, error } }
}

function getAll(count, skip) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            patientService.getAll(count, skip).then( response => {
                console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: patientConstants.GET_ALL_REQUEST } }
    function success(patients) { return { type: patientConstants.GET_ALL_SUCCESS, patients } }
    function failure(error) { return { type: patientConstants.GET_ALL_FAILURE, error } }
}

function getPaginationLink(link, currentPage) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            patientService.getPaginationLink(link, currentPage).then( response => {
                // console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: patientConstants.GET_ALL_REQUEST } }
    function success(patients) { return { type: patientConstants.GET_ALL_SUCCESS, patients } }
    function failure(error) { return { type: patientConstants.GET_ALL_FAILURE, error } }
}

function searchByIdOrName(query, count) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            patientService.searchByIdOrName(query, count).then( response => {
                console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: patientConstants.GET_ALL_REQUEST } }
    function success(patients) { return { type: patientConstants.GET_ALL_SUCCESS, patients } }
    function failure(error) { return { type: patientConstants.GET_ALL_FAILURE, error } }
}

function appendPractitionerToPatient(patientId, practitionerId) {
    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            patientService.appendPractitionerToPatient(patientId, practitionerId).then( response => {
                console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: patientConstants.APPEND_PRACTITIONER_REQUEST } }
    function success(patient) { return { type: patientConstants.APPEND_PRACTITIONER_SUCCESS, patient } }
    function failure(error) { return { type: patientConstants.APPEND_PRACTITIONER_FAILURE, error } }
}

// function getPreviousPage(link) {
//
//     return dispatch => {
//
//         dispatch(request())
//
//         proceed()
//
//         function proceed() {
//             patientService.getPreviousPage(link).then( response => {
//                 // console.log(response)
//                 dispatch(success(response))
//             }).catch(error => {
//                 dispatch(failure(error))
//             })
//         }
//     }
//
//     function request() { return { type: patientConstants.GET_ALL_REQUEST } }
//     function success(patients) { return { type: patientConstants.GET_ALL_SUCCESS, patients } }
//     function failure(error) { return { type: patientConstants.GET_ALL_FAILURE, error } }
// }
