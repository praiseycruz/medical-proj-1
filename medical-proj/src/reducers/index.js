import { combineReducers } from 'redux';
import { patient } from './patient.reducer';

const rootReducer = combineReducers({
    patient,
})

export default rootReducer;
