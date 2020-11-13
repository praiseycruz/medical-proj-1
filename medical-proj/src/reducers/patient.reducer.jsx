import { patientConstants } from '../constants'

var defaultState = {
    create: {
        loading: false,
        success: false,
        error: null,
        patient: {}
    },
    findAll: {
        loading: false,
        items: [],
        sucess: false,
        error: null
    },
    findById: {
        loading: false,
        item: {},
        success: false,
        error: null
    }
}

export function patient(state = defaultState, action) {

    switch (action.type) {
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
        case patientConstants.FIND_ALL_REQUEST:
            var {
                findAll,
                ...otherState
            } = state

            findAll.loading = false
            findAll.error = null
            findAll.success = false
            findAll.items = action.items
            state = {
                findAll,
                ...otherState
            }
            return state
        case patientConstants.FIND_ALL_SUCCESS:
            var {
                findAll,
                ...otherState
            } = state

            findAll.loading = false
            findAll.error = null
            findAll.success = true
            state = {
                findAll,
                ...otherState
            }
            return state
        case patientConstants.FIND_ALL_FAILURE:
            var {
                findAll,
                ...otherState
            } = state

            findAll.loading = false
            findAll.error = action.error
            findAll.success = false
            state = {
                findAll,
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
