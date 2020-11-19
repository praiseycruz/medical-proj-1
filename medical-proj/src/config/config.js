import { Patient } from './Patient'
import { Device } from './Device'
import { CareTeam } from './CareTeam'
import { Practitioner } from './Practitioner'


export const config = {
    apiGateway: {
        URL: 'https://hapi.fhir.org/baseR4'
    },
    sessionGateway: {
        URL: 'http://medtrackswp.azurewebsites.net'
    },
    ContentType: {
        GET: 'application/json',
        POST: 'application/json',
        PATCH: 'application/json-patch+json',
    },
    Patient : Patient.endPoints,
    Device: Device.endPoints,
    CareTeam : CareTeam.endPoints,
    Practitioner : Practitioner.endPoints,
}
