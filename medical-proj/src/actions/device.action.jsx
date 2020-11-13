import { deviceService } from '../services'
import { deviceConstants } from '../constants'

export const deviceAction = {
    addDevice
}

function addDevice(data) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            deviceService.addDevice(data).then( response => {
                console.log(response)
                dispatch(success(response))
            }).catch(error => {
                dispatch(failure(error))
            })
        }
    }

    function request() { return { type: deviceConstants.CREATE_REQUEST } }
    function success(device) { return { type: deviceConstants.CREATE_SUCCESS, device } }
    function failure(error) { return { type: deviceConstants.CREATE_FAILURE, error } }
}
