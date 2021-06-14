import React from "react"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import useVisualMode from "../../hooks/useVisualMode"
import "components/Appointment/styles.scss"

export default function Appointment(props) {

  const {id, time, interview, bookInterview, cancelInterview} = props

  console.log("appointment:", interview);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name ,
      interviewer,
    };
    bookInterview(id, interview).then(() => transition(SHOW))
  }

  function deleteInt(id) {
    transition(DELETE)
    cancelInterview(id).then(() => transition(EMPTY))
  } 

  return (
    <article className="appointment">
      <header>{time}</header>
      {mode === EMPTY && <Empty 
        onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show
        student={interview && interview.student}
        interviewer={interview && interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
        />}
      {mode === SAVING && <Status 
        message={"Saving"}
      />}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}
      {mode === DELETE && <Status 
        message={"Deleting"}
      />}
      {mode === CONFIRM && <Confirm
        message={"Are you sure want to delete the appointment?"}
        onConfirm={() => deleteInt(id)}
        onCancel={back}
      />}
      {mode === EDIT && <Form
        student={interview.student}
        interviewer={interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}

    </article>
  )
}