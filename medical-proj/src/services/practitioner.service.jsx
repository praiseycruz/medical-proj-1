import React from 'react'
import { config } from '../config'
import { Method, RandNum } from '../helpers'

export const practitionerService = {
    create,
    getAll,
    findById,
    searchByIdOrName,
    getPaginationLink,
}

function create(data) {
    const requestOptions = headers(Method.POST, JSON.stringify(data))

    return fetch(config.apiGateway.URL + `/Practitioner`, requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function getAll(count, skip) {
    const requestOptions = headers(Method.GET)

    return fetch(config.apiGateway.URL + config.Practitioner.getAll(count, skip), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

function findById(id) {
    const requestOptions = headers(Method.GET)

    return fetch(config.apiGateway.URL + config.practitioner.findById(id), requestOptions)
    .then(handleResponse)
    .then(response => {
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })

}

function searchByIdOrName(query, count) {
    const requestOptions = headers(Method.GET)

    const filterParam = Number.isNaN(parseInt(query)) ? `name co ${query}` : `identifier co http://hl7.org/fhir/sid/us-ssn|${query}`

    return fetch(config.apiGateway.URL + config.Practitioner.search(filterParam, count), requestOptions)
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

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    return data
  })
}
