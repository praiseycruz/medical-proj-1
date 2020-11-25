import { combineReducers } from 'redux';
import { patient } from './patient.reducer';
import { practitioner } from './practitioner.reducer';
import { dashboardPatientCount } from './dashboard.reducer';
import { device } from './device.reducer';
import { breadCrumbs } from './breadcrumbs.reducer';

const rootReducer = combineReducers({
    patient,
    practitioner,
    dashboardPatientCount,
    device,
    breadCrumbs
})

export default rootReducer;
