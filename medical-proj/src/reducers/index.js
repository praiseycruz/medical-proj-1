import { combineReducers } from 'redux'
import { patient } from './patient.reducer'
import { device } from './device.reducer';

const rootReducer = combineReducers({
    patient,
    device
})

export default rootReducer;
