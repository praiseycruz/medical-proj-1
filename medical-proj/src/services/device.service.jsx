import React from 'react'
import { config } from '../config'

export const deviceService = {
    assignPatientToDevice,
    findById,
    findUnassigned,
}

function assignPatientToDevice(deviceId, patientId) {
    const requestOptions ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
            op: "add",
            path: "/patient",
            value: {
                reference: `Patient/${patientId}`,
                type: "Patient"
            }
        }])
    }

    return fetch(config.apiGateway.URL + config.Device.assignPatient(deviceId), requestOptions)
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

    return fetch(config.apiGateway.URL + config.Device.findById(id), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })

}

function findUnassigned() {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(config.apiGateway.URL + config.Device.findUnassigned, requestOptions)
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
