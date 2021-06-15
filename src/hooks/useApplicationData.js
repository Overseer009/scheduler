import axios from "axios"
import { useState, useEffect } from "react"

export default function useApplicationData () {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysURL = "/api/days"
    const appointmentURL = "/api/appointments"
    const interviewersURL = "/api/interviewers"
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {
      interview
    }).then(() => {
      const coolState = { ...state, appointments }
      const evenCoolerState = remainingSpots(coolState, coolState.day);
      setState(evenCoolerState);
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const coolState = { ...state, appointments }
      const evenCoolerState = remainingSpots(coolState, coolState.day);
      console.log("evenCoolerState:", coolState);
      setState(evenCoolerState);

    });
  }

  const remainingSpots = (state, day) => {
    const dayOfRemainder = day || state.day;
    const dayObj = state.days.find(day => day.name === dayOfRemainder);
    const IdList = dayObj.appointments;
    const spots = IdList.filter(apptId => !state.appointments[apptId].interview).length;
    
    const newDay = { ...dayObj, spots};
    const newDays = [...state.days];
    const dayObjIndex = state.days.findIndex(day => day.name === dayOfRemainder);
    newDays[dayObjIndex] = newDay;
    return {...state, days: newDays};
  }

  return { state, setDay, bookInterview, cancelInterview };
}