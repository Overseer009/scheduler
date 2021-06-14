
export function getAppointmentsForDay(state, day) {
  let result = [];
  const filteredApps = state.days.map(d => {
    if(d.name === day){
      return d.appointments;
    } else {
      return [];
    }
  }).flat()
  if (state.appointments) {
    Object.values(state.appointments).map(app => {
    if(filteredApps.includes(app.id)) {
      result.push(app);
    }
    return result
    });
  }
  return result;
}

export function getInterview(state, interview) {
  let interviewObj = {};
  if(interview) {
    Object.values(state.interviewers).map(int => {
      if (int.id === interview.interviewer) {
        interviewObj.student = interview.student;
        interviewObj.interviewer = int;
      }
      return interviewObj
    });
    return interviewObj;
  } else {
    return null;
  }
};

export function getInterviewersForDay (state, day) {
  let result = [];
  const filteredInts = state.days.map(d => {
    if(d.name === day){
      return d.interviewers;
    } else {
      return [];
    }
  }).flat()
  if (state.interviewers) {
    Object.values(state.interviewers).map(app => {
    if(filteredInts.includes(app.id)) {
      result.push(app);
    }
    return result
    });
  }
  return result;
}