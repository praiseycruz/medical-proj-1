import { Patient } from './Patient'
import { Practitioner } from './Practitioner'


export const config = {
    apiGateway: {
        URL: 'https://hapi.fhir.org/baseR4'
    },
    sessionGateway: {
        URL: 'http://medtrackswp.azurewebsites.net'
    }
}
