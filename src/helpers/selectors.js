// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }


export function getAppointmentsForDay(state, day) {
  let result = []
  const filteredApps = state.days.map(d => {
    if(d.name === day){
      return d.appointments
    } else {
      return []
    }
  }).flat()
  if (state.appointments) {
    Object.values(state.appointments).map(app => {
    if(filteredApps.includes(app.id)) {
      result.push(app)
      }
    })
  }
  return result
}