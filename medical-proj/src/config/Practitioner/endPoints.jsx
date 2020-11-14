export const endPoints = {
    create: '/Practitioner',
    getAll: (count, skip) => `/Practitioner?identifier=EXSYS|&_count=${count}&_skip=${skip}&_pretty=false`,
    findById: (id) =>  `/Practitioner/${id}`
}
