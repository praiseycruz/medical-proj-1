import { config } from '../config'
import { RandNum } from '../helpers'

export const dashboardService = {
    createCareTeam
}

function createCareTeam(patientId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            resourceType: "CareTeam",
            identifier: [{
                "value": RandNum("CT"),
                "system": "EXSYS"
            }],
            subject: {
                reference: `Patient/${patientId}`,
                type: "Patient"
            },
            status: "proposed",
            participant: []
        }
    }

    return fetch(config.apiGateway.URL + config.CareTeam.create, requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}


function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    return data.total
  })
}
