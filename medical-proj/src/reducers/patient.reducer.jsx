import { patientConstants } from '../constants'

var defaultState = {
    create: {
        loading: false,
        success: false,
        error: null,
        patient: {}
    },
    getAll: {
        loading: false,
        patients: [],
        success: false,
        error: null
    },
    appendPractitioner: {
        loading: false,
        success: false,
        error: null,
        patient: {}
    }
    // findById: {
    //     loading: false,
    //     item: {},
    //     success: false,
    //     error: null
    // }
}

export function patient(state = defaultState, action) {
    switch (action.type) {
        // case patientConstants.CREATE_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //         newPatient: {}
        //     }
        //
        // case patientConstants.CREATE_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         newPatient: action.newPatient,
        //         success: true,
        //         error: null
        //     }
        //
        // case patientConstants.CREATE_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         success: false,
        //         newPatient: {},
        //         error: action.error
        //     }
        //
        // case patientConstants.GET_ALL_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //         patients: [],
        //     }
        //
        // case patientConstants.GET_ALL_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         patients: action.patients,
        //         success: true
        //     }
        //
        // case patientConstants.GET_ALL_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         patients: [],
        //         success: false,
        //         error: action.error
        //     }

        case patientConstants.CREATE_REQUEST:
            var {
                create,
                ...otherState
            } = state

            create.success = false
            create.error = null
            create.loading = true

            state = {
                create,
                ...otherState
            }

            return state

        case patientConstants.CREATE_SUCCESS:
            var {
                create,
                ...otherState
            } = state

            create.success = true
            create.loading = false
            create.error = null
            create.patient = action.patient

            state = {
                create,
                ...otherState
            }
            return state

        case patientConstants.CREATE_FAILURE:
            var {
                create,
                ...otherState
            } = state

            create.loading = false
            create.success = false
            create.error = action.error
            state = {
                create,
                ...otherState
            }

            return state

        case patientConstants.GET_ALL_REQUEST:
            var {
                getAll,
                ...otherState
            } = state

            getAll.loading = true
            getAll.error = null
            getAll.success = false

            state = {
                getAll,
                ...otherState
            }
            return state

        case patientConstants.GET_ALL_SUCCESS:
            var {
                getAll,
                ...otherState
            } = state

            getAll.loading = false
            getAll.error = null
            getAll.success = true
            getAll.patients = action.patients

            state = {
                getAll,
                ...otherState
            }
            return state
        case patientConstants.GET_ALL_FAILURE:
            var {
                getAll,
                ...otherState
            } = state

            getAll.loading = false
            getAll.error = action.error
            getAll.success = false
            state = {
                getAll,
                ...otherState
            }
            return state
        case patientConstants.APPEND_PRACTITIONER_REQUEST:
            var {
                appendPractitioner,
                ...otherState
            } = state
            appendPractitioner.success = false
            appendPractitioner.error = null
            appendPractitioner.loading = true

            state = {
                appendPractitioner,
                ...otherState
            }

            return state
        case patientConstants.APPEND_PRACTITIONER_SUCCESS:
            var {
                appendPractitioner,
                ...otherState
            } = state
            appendPractitioner.success = true
            appendPractitioner.loading = false
            appendPractitioner.error = null
            appendPractitioner.patient = action.patient

            state = {
                appendPractitioner,
                ...otherState
            }
            return state
        case patientConstants.APPEND_PRACTITIONER_FAILURE:
            var {
                appendPractitioner,
                ...otherState
            } = state
            appendPractitioner.loading = false
            appendPractitioner.success = false
            appendPractitioner.error = action.error

            state = {
                appendPractitioner,
                ...otherState
            }
            return state
        case patientConstants.FIND_BY_ID_REQUEST:
            var {
                findById,
                ...otherState
            } = state

            findById.loading = false
            findById.error = null
            findById.success = false
            state = {
                findById,
                ...otherState
            }
            return state
        case patientConstants.FIND_BY_ID_SUCCESS:
            var {
                findById,
                ...otherState
            } = state

            findById.loading = false
            findById.error = null
            findById.success = true
            findById.item = action.item
            state = {
                findById,
                ...otherState
            }
            return state
        case patientConstants.FIND_BY_ID_FAILURE:
            var {
                findById,
                ...otherState
            } = state

            findById.loading = false
            findById.error = action.error
            findById.success =false
            state = {
                findById,
                ...otherState
            }
            return state

        default:
            return state;
    }
};
