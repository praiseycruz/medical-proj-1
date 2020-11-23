import React from 'react'
import { config } from '../config'
import { Method, headers } from '../helpers'

export const deviceService = {
    assignPatientToDevice,
    findById,
    findUnassigned,
    unassignDevice,
}

function assignPatientToDevice(deviceId, patientId) {
    /*
        Device status must be "inactive" for it to be
        successfully assigned. On successful assignment,
        device status is changed to "active"
    */
    const requestOptions = headers(
        Method.PATCH,
        JSON.stringify([
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
    )

    return fetch(config.apiGateway.URL + config.Device.assignPatient(deviceId), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function unassignDevice(deviceId, patientId) {
    /*
        Check if device is active => patient is
        assigned. Check if patientId on server
        is what is expected, and then remove,
        and mard device as inactive
    */
    const requestOptions = headers(
        Method.PATCH,
        JSON.stringify([
            {
                op: "test",
                path: "/status",
                value: "active"
            },
            {
                op: "test",
                path: "/patient",
                value: {
                    reference: `Patient/${patientId}`,
                    type: "Patient"
                }
            },
            {
                op: "remove",
                path: "/patient"
            },
            {
                op: "replace",
                path: "/status",
                value: "inactive"
            }
        ])
    )

    return fetch(config.apiGateway.URL + config.Device.findById(deviceId), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function findById(id) {

    const requestOptions = headers(Method.GET)

    return fetch(config.apiGateway.URL + config.Device.findById(id), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })

}

function findUnassigned() {
    const requestOptions = headers(Method.GET)

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
