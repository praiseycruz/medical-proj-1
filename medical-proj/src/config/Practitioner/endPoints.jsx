export const endPoints = {
    create: '/Practitioner',
    getAll: (count, skip) => `/Practitioner?identifier=EXSYS|&_count=${count}&_skip=${skip}&_pretty=false`,
    search: (query, count) => `/Practitioner?identifier=EXSYS|&_filter=${query}&_pretty=false&_count=${count}`,
    findById: (id) =>  `/Practitioner/${id}`
}
