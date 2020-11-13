import { combineReducers } from 'redux';
import { patient } from './patient.reducer';
import { dashboardPatientCount } from './dashboard.reducer';
import { device } from './device.reducer';

const rootReducer = combineReducers({
    patient,
    dashboardPatientCount,
    device
})

export default rootReducer;
