import { deviceService } from '../services'
import { deviceConstants } from '../constants'

export const deviceAction = {
    assignPatientToDevice,
    unassignDevice,
    findUnassigned,
    findById,
}

function assignPatientToDevice(deviceId, patientId) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            deviceService.assignPatientToDevice(deviceId, patientId).then( response => {
                // console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: deviceConstants.ASSIGN_REQUEST } }
    function success(device) { return { type: deviceConstants.ASSIGN_SUCCESS, device } }
    function failure(error) { return { type: deviceConstants.ASSIGN_FAILURE, error } }
}

function unassignDevice(deviceId, patientId) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            deviceService.unassignDevice(deviceId, patientId).then( response => {
                // console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: deviceConstants.UNASSIGN_REQUEST } }
    function success(device) { return { type: deviceConstants.UNASSIGN_SUCCESS, device } }
    function failure(error) { return { type: deviceConstants.UNASSIGN_FAILURE, error } }
}


function findUnassigned() {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            deviceService.findUnassigned().then( response => {
                // console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: deviceConstants.FIND_ALL_UNASSIGNED_REQUEST } }
    function success(devices) { return { type: deviceConstants.FIND_ALL_UNASSIGNED_SUCCESS, devices } }
    function failure(error) { return { type: deviceConstants.FIND_ALL_UNASSIGNED_FAILURE, error } }
}


function findById(id) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            deviceService.findById(id).then( response => {
                console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: deviceConstants.FIND_BY_ID_REQUEST } }
    function success(device) { return { type: deviceConstants.FIND_BY_ID_SUCCESS, device } }
    function failure(error) { return { type: deviceConstants.FIND_BY_ID_FAILURE, error } }
}
