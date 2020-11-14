import React from 'react'
import { config } from '../config'

export const practitionerService = {
    create,
    getAll,
    findById,
}

function create(data) {
    const requestOptions ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch(config.apiGateway.URL + `/Practitioner`, requestOptions)
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

    return fetch(config.apiGateway.URL + config.Practitioner.getAll(count, skip), requestOptions)
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

    return fetch(config.apiGateway.URL + config.practitioner.findById(id), requestOptions)
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
