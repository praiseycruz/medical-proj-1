import React from 'react'
import { config } from '../config'

export const patientService = {
    create,
    findById,
    searchByIdOrName,
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

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    return data
  })
}
