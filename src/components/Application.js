import React, { useState, useEffect } from "react";
import DayList from "./DayList"
import Appointment from "./Appointment/index"
import axios from "axios"
import "components/Application.scss";

  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
      interview: {
        student: "Everly Aymerric",
        interviewer: { 
          id: 3, 
          name: "Mildred Nazir", 
          avatar: "https://i.imgur.com/T2WwVfS.png" }
      }
    },
    {
      id: 4,
      time: "3pm",
    },
    {
      id: 5,
      time: "4pm",
      interview: {
        student: "Alex Byrnes",
        interviewer: { 
          id: 5, 
          name: "Sven Jones", 
          avatar: "https://i.imgur.com/twYrpay.jpg"
        }
      }
    },
  ];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  

  useEffect(() => {
    const daysURL = "/api/days"
    axios.get(daysURL).then(response => {
      setDays(response.data)
    })
  }, [])

  const allAppointments = appointments.map((appointment) => {
    return (
      <Appointment key={appointment.id} {... appointment} />
    )
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
            days={days}
            day={day}
            setDay={setDay}/>
          </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {allAppointments}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
