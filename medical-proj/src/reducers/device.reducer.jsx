import { deviceConstants } from '../constants'

var defaultState = {
    addDevice: {
        loading: false,
        success: false,
        error: null,
        device: {}
    }
}

export function device(state = defaultState, action) {
    switch (action.type) {
        case deviceConstants.CREATE_REQUEST:
            var {
                addDevice,
                ...otherState
            } = state
            addDevice.success = false
            addDevice.error = null
            addDevice.loading = true

            state = {
                addDevice,
                ...otherState
            }

            return state
        case deviceConstants.CREATE_SUCCESS:
            var {
                addDevice,
                ...otherState
            } = state
            addDevice.success = true
            addDevice.loading = false
            addDevice.error = null
            addDevice.device = action.device

            state = {
                addDevice,
                ...otherState
            }
            return state
        case deviceConstants.CREATE_FAILURE:
            var {
                addDevice,
                ...otherState
            } = state
            addDevice.loading = false
            addDevice.success = false
            addDevice.error = action.error

            state = {
                addDevice,
                ...otherState
            }
            return state
        default:
            return state;
    }
};
