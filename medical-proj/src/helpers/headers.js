export function headers(method, body = {}, extraHeaders = {}){
    let ret = {
        method: method.name,
        headers: {
            ...method.headers,
            ...extraHeaders,
        }
    }

    if (method !== Method.GET) {
        ret.body = body
    }
    console.log(ret)
    return ret;
}

const commonHeaders = {
    "Accept": "application/json",
}

export const Method = {
    POST:   {
        name: "POST",
        headers: {
            "Content-Type": "application/json",
            ...commonHeaders,
        }
    },
    GET:    {
        name: "GET",
        headers: {
            "Content-Type": "application/json",
            ...commonHeaders,
        }
    },
    PATCH:  {
        name: "PATCH",
        headers: {
            "Content-Type": "application/json-patch+json",
            ...commonHeaders,
        }
    },
    DELETE: {
        name: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...commonHeaders,
        }
    },
    PUT:    {
        name: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...commonHeaders,
        }
    },
}
