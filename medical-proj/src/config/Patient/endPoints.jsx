export const endPoints = {
    create: '/Patient',
    getAll: (count, skip) => `/Patient?identifier=EXSYS|&_count=${count}&_skip=${skip}&_pretty=false`,
    findById: (id) =>  `/Patient/${id}?_pretty=false`,
    search: (query, count) => `/Patient?identifier=EXSYS|&_filter=${query}&_pretty=false&_count=${count}`,
}
