export const endPoints = {
    create: '/CareTeam?_pretty=false',
    getAll: (count, skip) => `/CareTeam?identifier=EXSYS|&_count=${count}&_skip=${skip}&_pretty=false`,
    appendPractitioner: (careTeamId) => `/CareTeam/${careTeamId}?_pretty=false`,
    findByPatientId: (patientId) => `/CareTeam?subject=${patientId}&_pretty=false`,
}
