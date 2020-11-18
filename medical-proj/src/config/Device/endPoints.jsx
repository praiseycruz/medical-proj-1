export const endPoints = {
    create: '/Device',
    findById: (id) => `/Device/${id}?_pretty=false`,
    assignPatient: (deviceId) => `/Device/${deviceId}?_pretty=false`,
    findUnassigned: "/Device?identifier=EXSYS|&patient:missing=true&_pretty=false"
}
