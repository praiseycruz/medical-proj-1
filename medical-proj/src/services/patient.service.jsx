import React from 'react'
import { config } from '../config'

export const patientService = {
    create,
    findById,
    getAll,
    searchByIdOrName,
    getPaginationLink,
    appendPractitionerToPatient,
    // getPreviousPage
}

function create(data) {
    const requestOptions ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch(config.apiGateway.URL + `/Patient`, requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function findById(id) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(config.apiGateway.URL + config.Patient.findById(id), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })

}

function getAll(count, skip) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(config.apiGateway.URL + config.Patient.getAll(count, skip), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function getPaginationLink(link, currentPage) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

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
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const filterParam = Number.isNaN(parseInt(query)) ? `name co ${query}` : `identifier co http://hl7.org/fhir/sid/us-ssn|${query}`

    return fetch(config.apiGateway.URL + config.Patient.search(filterParam, count), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function appendPractitionerToPatient(patientId, practitionerId) {
    const requestOptions ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
            op: "add",
            path: "/generalPractitioner",
            value: [{
                reference: `Practitioner/${practitionerId}`,
                type: "Practitioner"
            }]
        }])
    }

    return fetch(config.apiGateway.URL + config.Patient.appendPractitioner(patientId), requestOptions)
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
