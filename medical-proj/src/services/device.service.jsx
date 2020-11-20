import React from 'react'
import { config } from '../config'

export const deviceService = {
    assignPatientToDevice,
    findById,
    findUnassigned,
}

function assignPatientToDevice(deviceId, patientId, devicePatientData) {
    /*
        devicePatientData must be whatever is in `Device.patient`
        Example:
        devicePatientData = {
            "reference": "Patient/1635625",
            "type": "Patient"
        }

        If this is the data on the server under `Device.patient`, it replaces
        patient under `Device.patient` else returns 400 bad request

    */
    const requestOptions ={
        method: 'PATCH',
        headers: {
            'Content-Type': config.ContentType.PATCH
        },
        body: JSON.stringify([
            // { // This doesn't work as of now
            //     op: "test",
            //     path: "/Patient",
            //     value: devicePatientData
            // },
            {
                op: "add",
                path: "/Patient",
                value: {
                    reference: `Patient/${patientId}`,
                    type: "Patient"
                }
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
