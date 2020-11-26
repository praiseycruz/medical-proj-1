import { Patient } from './Patient'
import { Device } from './Device'
import { CareTeam } from './CareTeam'
import { Practitioner } from './Practitioner'


export const config = {
    apiGateway: {
        URL: 'https://hapi.fhir.org/baseR4'
        // URL: 'https://r4.test.pyrohealth.net/fhir'
    },
    googleApiKey: 'AIzaSyAHgCN7lHQmmGyfzXND6nVFxfIdiHsN5bM',
    sessionGateway: {
        URL: 'http://medtrackswp.azurewebsites.net'
    },
    Patient : Patient.endPoints,
    Device: Device.endPoints,
    CareTeam : CareTeam.endPoints,
    Practitioner : Practitioner.endPoints,
}
