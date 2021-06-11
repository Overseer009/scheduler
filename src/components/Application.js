import React, { useState, useEffect } from "react";
import DayList from "./DayList"
import Appointment from "./Appointment/index"
import axios from "axios"
import { getAppointmentsForDay } from "../helpers/selectors";
import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

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
      console.log("data:", all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])


  const allDailyAppointments = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}/>
          </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {allDailyAppointments}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
