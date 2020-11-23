import { careTeamService } from '../services'
import { careTeamConstants } from '../constants'

export const careTeamAction = {
    create,
    getAll,
    findByPatientId,
    appendPractitioner,
    createWithPractitioner,
}

function create(patientId) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            careTeamService.createCareTeam(patientId).then( response => {
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

function createWithPractitioner(patientId, practitionerId, practitionerRole) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            careTeamService.createCareTeam(patientId, practitionerId, practitionerRole).then( response => {
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

function getAll(count, skip) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            careTeamService.getAll(count, skip).then( response => {
                console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: careTeamConstants.GET_ALL_REQUEST } }
    function success(careteams) { return { type: careTeamConstants.GET_ALL_SUCCESS, careteams } }
    function failure(error) { return { type: careTeamConstants.GET_ALL_FAILURE, error } }
}

function findByPatientId(patientId) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            careTeamService.findByPatientId(patientId).then( response => {
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: careTeamConstants.FIND_BY_PATIENTID_REQUEST } }
    function success(careTeam) { return { type: careTeamConstants.FIND_BY_PATIENTID_SUCCESS, careTeam } }
    function failure(error) { return { type: careTeamConstants.FIND_BY_PATIENTID_FAILURE, error } }
}

function appendPractitioner(careTeamId, currentParticipants, practitionerId, practitionerRole) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            careTeamService.appendPractitioner(careTeamId, currentParticipants, practitionerId, practitionerRole).then( response => {
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: careTeamConstants.APPEND_PRACTITIONER_REQUEST } }
    function success(careTeam) { return { type: careTeamConstants.APPEND_PRACTITIONER_SUCCESS, careTeam } }
    function failure(error) { return { type: careTeamConstants.APPEND_PRACTITIONER_FAILURE, error } }
}
