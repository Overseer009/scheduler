import { useState } from "react"

// two functions that help travel between modes on the appointment component
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  function transition(nextMode, replace = false) {
    if(!replace) {
      setMode(nextMode)
      setHistory(history => [...history, nextMode])
    } else {
      setMode(nextMode)
    }
  };

  function back () {
    if(history.length > 1) {
      setMode(history[history.length - 2])
      setHistory(history.slice(0, history.length - 1))
    } else {
      setMode(initial)
      setHistory([initial])
    }
  };
  return { mode, transition, back };
};