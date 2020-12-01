import React from 'react'
import { config } from '../config'
import { Method, headers, RandNum } from '../helpers'

export const patientService = {
    create,
    findById,
    getAll,
    searchByIdOrName,
    getPaginationLink,
    appendPractitionerToPatient,
    // getPreviousPage
}

// function create(data) {
//     const requestOptions = headers(Method.POST, JSON.stringify(data))

//     return fetch(config.apiGateway.URL + `/Patient`, requestOptions)
//     .then(handleResponse)
//     .then(response => {
//         return Promise.resolve(response)
//     }).catch(error => {
//         return Promise.reject(error)
//     })
// }

function findById(id) {

    const requestOptions = headers(Method.GET)

    return fetch(config.apiGateway.URL + config.Patient.findById(id), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })

}

function getAll(count, skip) {
    const requestOptions = headers(Method.GET)

    return fetch(config.apiGateway.URL + config.Patient.getAll(count, skip), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function getPaginationLink(link, currentPage) {
    const requestOptions = headers(Method.GET)

    //number of itemss per page
    let numItems = 10

    return fetch(link, requestOptions)
    .then(handleResponse)
    .then(response => {

        //check current page if it is set
        if (typeof currentPage!=='undefined') {

            if (typeof response.link!=='undefined' && response.link!==null && response.link.length > 0) {
                 response.link.map ( (value, key) => {

                     let tempUrl = value.url
                     if (value.relation=='previous' || value.relation=='next') {
                         //set page offset based on the relation

                        let pageOffset = 0
                        if (value.relation=='previous') {
                            pageOffset = ((currentPage - 1) * numItems) - numItems
                            tempUrl = tempUrl.replace(/offset=[0-9]*/g,`offset=${pageOffset}`)
                        }
                         tempUrl = tempUrl.replace(/count=[0-9]*/g,'count=10')

                         response.link[key].url = tempUrl
                     }
                 })
             }
        }

        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function searchByIdOrName(query, count) {
    const requestOptions = headers(Method.GET)

    const filterParam = Number.isNaN(parseInt(query)) ? `name co ${query}` : `identifier co http://hl7.org/fhir/sid/us-ssn|${query}`

    return fetch(config.apiGateway.URL + config.Patient.search(filterParam, count), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function appendPractitionerToPatient(patientId, currentGPData, practitionerId) {
    /*
        currentGPData must be whatever is in `Patient.generalPractitioner`
        Example:
        currentGPData = [
            {
                "reference": "Practitioner/1635625",
                "type": "Practitioner"
            },
            {
                "reference": "Practitioner/1635638",
                "type": "Practitioner"
            },
            ...
        ]

        If this is the data on the server under patient.generalPractitioner, it adds a new
        practitioner under patient.generalPractitioner else returns 400 bad request

    */
    const requestOptions = headers(
        Method.PATCH,
        JSON.stringify([
            {
                op: "test",
                path: "/generalPractitioner",
                value: currentGPData
            },
            {
                op: "add",
                path: `/generalPractitioner/-`,
                value: [{
                    reference: `Practitioner/${practitionerId}`,
                    type: "Practitioner"
                }]
            }
        ])
    )

    return fetch(config.apiGateway.URL + config.Patient.appendPractitioner(patientId), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function create(patientData, physicianId, careManagerId, deviceIds) {

    let tempPatientId = RandNum('')

    // TODO: Use sonmed code role
    // https://www.hl7.org/fhir/valueset-participant-role.html

    let deviceTemplate = (deviceId, patientId) => {
        return {
            "resourceType": "Device",
            "status": "active",
            "subject": {
                reference: `Patient/${patientId}`,
                type: "Patient"
            },
            "request": {
                "method": "PATCH",
                "ifNoneExist": `status=active&_id=${deviceId}`,
            }
        }
    }

    let conditionsTemplate = (patientId, contitionName) => {
        return {
            "resourceType": "Condition",
            "code": {
                "system": "EXSYS",
                "text": `${contitionName}`,
            },
            "subject": {
                "reference": `Patient/${patientId}`,
                "type": "Patient"
            },
            "request": {
                "method": "POST",
            }
        }
    }

    // End resources transaction

    let reqBody = {
        "resourceType": "Bundle",
        "type": "transaction",
        "entry": [
            {
                "id": `${tempPatientId}`,
                ...patientData,
                "request": {
                    "method": "POST",
                }
            },
            {
                "resourceType": "CareTeam",
                "identifier": [{
                    "value": RandNum("CT"),
                    "system": "EXSYS"
                }],
                "subject": {
                    "reference": `Patient/${tempPatientId}`,
                    "type": "Patient"
                },
                "participant": [
                    {
                        "role": [{
                            "coding": "http://snomed.info/sct",
                            "text": "Primary Physician",
                        }],
                        "member": {
                            "reference": `Practitioner/${physicianId}`,
                            "type": "Practitioner"
                        }
                    },
                    {
                        "role": [{
                            "coding": "http://snomed.info/sct",
                            "text": "Primary Care Manager",
                        }],
                        "member": {
                            "reference": `Practitioner/${careManagerId}`,
                            "type": "Practitioner"
                        }
                    }
                ],
                "status": "active",
                "request": { "method": "POST" }
            },
            ...deviceIds.map(id => deviceTemplate(id, tempPatientId)),
            // ...conditions.map(name => conditionsTemplate(name, tempPatientId)),
        ]
    }

    const requestOptions = headers(Method.POST, reqBody)

    return fetch(config.apiGateway.URL + "/Bundle", requestOptions)
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
