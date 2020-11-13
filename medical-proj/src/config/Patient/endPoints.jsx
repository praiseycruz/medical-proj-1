export const endPoints = {
    create: '/patient',
    findAll: '/api/v1/patients/all',
    findById: (id) =>  `/api/v1/patients/${id}`,
    search: (query, count) => `/Patient?_filter=${query}&_pretty=false&_count=${count}`,
}
