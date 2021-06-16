import React from "react";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";
import "components/Appointment/styles.scss";

//Main Hub for the different modes of the appointment component
export default function Appointment(props) {

  const {id, time, interview, bookInterview, cancelInterview} = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERR_SAVE = "ERR_SAVE";
  const ERR_DELETE = "ERR_DELETE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  //Triggers a few trasitions and the bookInterview function
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    //Located in the hooks/useApplicationData.js
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERR_SAVE, true));
  };

  //Triggers a few trasitions and the cancelInterview function
  function deleteInt(id) {
    transition(DELETE);
    //Located in the hooks/useApplicationData.js
    cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERR_DELETE, true));
  };

  return (
    <article className="appointment" data-testid="appointment">
      <header>{time}</header>

      {mode === EMPTY && <Empty 
        onAdd={() => transition(CREATE)} 
      />}

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
        message={"Are you sure you would like to delete?"}
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

      {mode === ERR_SAVE && <Error 
        message={"Could not SAVE the appointment, please try again."}
        onClose={back}
      />}

      {mode === ERR_DELETE && <Error 
        message={"Could not DELETE the appointment, please try again."}
        onClose={back}
      />}

    </article>
  )
};