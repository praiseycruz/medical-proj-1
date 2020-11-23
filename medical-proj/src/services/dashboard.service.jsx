import React from 'react'
import { config } from '../config'
import { Method, RandNum } from '../helpers'

export const dashboardService = {
    count
}

function count() {
    const requestOptions = headers(Method.GET)

    return fetch(config.apiGateway.URL + `/Patient?_summary=count&identifier=EXSYS|`, requestOptions)
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
