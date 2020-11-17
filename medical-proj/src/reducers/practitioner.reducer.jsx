import { practitionerConstants } from '../constants'

var defaultState = {
    create: {
        loading: false,
        success: false,
        error: null,
        practitioner: {}
    },
    getAll: {
        loading: false,
        practitioners: [],
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

export function practitioner(state = defaultState, action) {

    switch (action.type) {
        case practitionerConstants.CREATE_REQUEST:
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
        case practitionerConstants.CREATE_SUCCESS:
            var {
                create,
                ...otherState
            } = state
            create.success = true
            create.loading = false
            create.error = null
            create.practitioner = action.practitioner
            state = {
                create,
                ...otherState
            }
            return state
        case practitionerConstants.CREATE_FAILURE:
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
        case practitionerConstants.GET_ALL_REQUEST:
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
        case practitionerConstants.GET_ALL_SUCCESS:
            var {
                getAll,
                ...otherState
            } = state

            getAll.loading = false
            getAll.error = null
            getAll.success = true
            getAll.practitioners = action.practitioners
            state = {
                getAll,
                ...otherState
            }
            return state
        case practitionerConstants.GET_ALL_FAILURE:
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
        case practitionerConstants.FIND_BY_ID_REQUEST:
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
        case practitionerConstants.FIND_BY_ID_SUCCESS:
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
        case practitionerConstants.FIND_BY_ID_FAILURE:
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
