import React from "react"
import "components/Appointment/styles.scss"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment(props) {

  const { interview } = props

  const makeInterview = props.interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty/>

  return (
    <article className="appointment">
      <header>{props.time}</header>
      {makeInterview}
    </article>
  )
}