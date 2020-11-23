export function headers(method, body = {}, extraHeaders = []){
    return {
        method: method.name,
        headers: {
            ...method.headers,
            ...extraHeaders,
        },
        body: body,
    }
}


export const Method = {
    POST:   {
        name: "POST",
        headers: [
            { "Content-Type": "application/json" },
            ...commonHeaders
        ]
    },
    GET:    {
        name: "GET",
        headers: [
            { "Content-Type": "application/json" },
            ...commonHeaders
        ]
    },
    PATCH:  {
        name: "PATCH",
        headers: [
            { "Content-Type": "application/json-patch+json" },
            ...commonHeaders
        ]
    },
    DELETE: {
        name: "DELETE",
        headers: [
            { "Content-Type": "application/json" },
            ...commonHeaders
        ]
    },
    PUT:    {
        name: "PUT",
        headers: [
            { "Content-Type": "application/json" },
            ...commonHeaders
        ]
    },
}

const commonHeaders = [
    { "Accept": "application/json" },
]
