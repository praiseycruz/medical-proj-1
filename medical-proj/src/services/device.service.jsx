import React from 'react'
import { config } from '../config'

export const deviceService = {
    assignPatientToDevice,
    findById,
    findUnassigned,
}

function assignPatientToDevice(deviceId, patientId) {
    /*
        Device status must be "inactive" for it to be
        successfully assigned. On successful assignment,
        device status is changed to "active"
    */
    const requestOptions ={
        method: 'PATCH',
        headers: {
            'Content-Type': config.ContentType.PATCH
        },
        body: JSON.stringify([
            {
                op: "test",
                path: "/status",
                value: "inactive"
            },
            {
                op: "add",
                path: "/patient",
                value: {
                    reference: `Patient/${patientId}`,
                    type: "Patient"
                }
            },
            {
                op: "replace",
                path: "/status",
                value: "active"
            }
        ])
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
            'Content-Type': config.ContentType.GET
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
            'Content-Type': config.ContentType.GET
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
