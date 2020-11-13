import { combineReducers } from 'redux';
import { patient } from './patient.reducer';
import { dashboardPatientCount } from './dashboard.reducer';

const rootReducer = combineReducers({
    patient,
    dashboardPatientCount,
})

export default rootReducer;
