import { combineReducers } from 'redux';
import { patient } from './patient.reducer';
import { practitioner } from './practitioner.reducer';
import { dashboardPatientCount } from './dashboard.reducer';
import { device } from './device.reducer';
import { breadCrumbs } from './breadcrumbs.reducer';
import { accordion } from './accordion.reducer';

const rootReducer = combineReducers({
    patient,
    practitioner,
    dashboardPatientCount,
    device,
    breadCrumbs,
    accordion
})

export default rootReducer;
