export const endPoints = {
    create: '/CareTeam?_pretty=false',
    appendPractitioner: (careTeamId) => `/CareTeam/${careTeamId}?_pretty=false`,
    findByPatientId: (patientId) => `/CareTeam?subject=${patientId}&_pretty=false`,
}
