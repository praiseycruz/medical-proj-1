import { config } from '../config'
import { Method, headers, RandNum } from '../helpers'

export const careTeamService = {
    getAll,
    createCareTeam,
    appendPractitioner,
    findByPatientId,
    createCareTeamWithPractitioner,
}

function getAll(count, skip) {
    const requestOptions = headers(Method.GET)

    return fetch(config.apiGateway.URL + config.CareTeam.getAll(count, skip), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function createCareTeam(patientId) {
    const requestOptions = headers(
        Method.POST,
        JSON.stringify({
            resourceType: "CareTeam",
            identifier: [{
                "value": RandNum("CT"),
                "system": "EXSYS"
            }],
            subject: {
                reference: `Patient/${patientId}`,
                type: "Patient"
            },
            status: "active",
        }),
        {'If-None-Exist': `subject=${patientId}`}
    )

    return fetch(config.apiGateway.URL + config.CareTeam.create, requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}


function createCareTeamWithPractitioner(patientId, practitionerId, practitionerRole) {
    const requestOptions = headers(
        Method.POST,
        JSON.stringify({
            resourceType: "CareTeam",
            identifier: [{
                "value": RandNum("CT"),
                "system": "EXSYS"
            }],
            subject: {
                reference: `Patient/${patientId}`,
                type: "Patient"
            },
            participant: [{
                role: [{
                    // https://www.hl7.org/fhir/valueset-participant-role.html
                    coding: "http://snomed.info/sct",
                    text: `${practitionerRole}`,
                }],
                member: {
                    reference: `Practitioner/${practitionerId}`,
                    type: "Practitioner"
                }
            }],
            status: "active",
        }),
        {'If-None-Exist': `subject=${patientId}`}
    )

    return fetch(config.apiGateway.URL + config.CareTeam.create, requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function appendPractitioner(careTeamId, currentParticipantsData, practitionerId, practitionerRole) {
    /*
        currentParticipantsData must be whatever is in `CareTeam.participant`
        Example:
        currentParticipantsData = [
            {
                "member": {
                    "reference": "Practitioner/1635625",
                    "type": "Practitioner"
                }
            }
            {
                "member": {
                    "reference": "Practitioner/1635626",
                    "type": "Practitioner"
                }
            }
            ...
        ]

        If this is the data on the server under CareTeam.participant, it adds a new
        practitioner under CareTeam.participant else returns 400 bad request
    */
    const requestOptions = headers(
        Method.PATCH,
        JSON.stringify([
            {
                op: "test",
                path: "/participant",
                value: currentParticipantsData
            },
            {
                op: "add",
                path: `/participant/-`,
                value: [{
                    role: [{
                        // https://www.hl7.org/fhir/valueset-participant-role.html
                        coding: "http://snomed.info/sct",
                        text: `${practitionerRole}`,
                    }],
                    member: {
                        reference: `Practitioner/${practitionerId}`,
                        type: "Practitioner"
                    }
                }]
            }
        ])
    )

    return fetch(config.apiGateway.URL + config.CareTeam.appendPractitioner(careTeamId), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}


function findByPatientId(patientId) {
    const requestOptions = headers(Method.GET)

    return fetch(config.apiGateway.URL + config.CareTeam.findByPatientId(patientId), requestOptions)
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
    return data
  })
}
