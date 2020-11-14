import { patientService } from '../services'
import { patientConstants } from '../constants'

export const patientAction = {
    create,
    getAll,
}

function create(data) {

    return dispatch => {

        dispatch(request())

        proceed()

        function proceed() {
            patientService.create(data).then( response => {
                console.log(response)
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
