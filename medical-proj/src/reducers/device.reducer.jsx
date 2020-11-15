import { deviceConstants } from '../constants'

var defaultState = {
    assignDevice: {
        loading: false,
        success: false,
        error: null,
        device: {}
    },
    unassignedDevices: {
        loading: false,
        success: false,
        error: null,
        devices: {}
    },
    findById: {
        loading: false,
        success: false,
        error: null,
        device: {},
    },
}

export function device(state = defaultState, action) {
    switch (action.type) {
        case deviceConstants.ASSIGN_REQUEST:
            var {
                assignDevice,
                ...otherState
            } = state
            assignDevice.success = false
            assignDevice.error = null
            assignDevice.loading = true

            state = {
                assignDevice,
                ...otherState
            }

            return state
        case deviceConstants.ASSIGN_SUCCESS:
            var {
                assignDevice,
                ...otherState
            } = state
            assignDevice.success = true
            assignDevice.loading = false
            assignDevice.error = null
            assignDevice.device = action.device

            state = {
                assignDevice,
                ...otherState
            }
            return state
        case deviceConstants.ASSIGN_FAILURE:
            var {
                assignDevice,
                ...otherState
            } = state
            assignDevice.loading = false
            assignDevice.success = false
            assignDevice.error = action.error

            state = {
                assignDevice,
                ...otherState
            }
            return state
        case deviceConstants.FIND_ALL_UNASSIGNED_REQUEST:
            var {
                unassignedDevices,
                ...otherState
            } = state
            unassignedDevices.success = false
            unassignedDevices.error = null
            unassignedDevices.loading = true

            state = {
                unassignedDevices,
                ...otherState
            }

            return state
        case deviceConstants.FIND_ALL_UNASSIGNED_SUCCESS:
            var {
                unassignedDevices,
                ...otherState
            } = state
            unassignedDevices.success = true
            unassignedDevices.loading = false
            unassignedDevices.error = null
            unassignedDevices.device = action.devices

            state = {
                unassignedDevices,
                ...otherState
            }
            return state
        case deviceConstants.FIND_ALL_UNASSIGNED_FAILURE:
            var {
                unassignedDevices,
                ...otherState
            } = state
            unassignedDevices.loading = false
            unassignedDevices.success = false
            unassignedDevices.error = action.error

            state = {
                unassignedDevices,
                ...otherState
            }
            return state
        case deviceConstants.FIND_BY_ID_REQUEST:
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
        case deviceConstants.FIND_BY_ID_SUCCESS:
            var {
                findById,
                ...otherState
            } = state

            findById.loading = false
            findById.error = null
            findById.success = true
            findById.device = action.device
            state = {
                findById,
                ...otherState
            }
            return state
        case deviceConstants.FIND_BY_ID_FAILURE:
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
