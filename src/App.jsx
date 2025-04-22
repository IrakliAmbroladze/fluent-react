import React, { useReducer } from "react";
import "./App.css";
import AddTask from "./components/add-task";
import TaskList from "./components/task-list";

function App() {
  const initialState = { text: "", isValid: false };
  function Form() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const handleChange = (e) => {
      dispatch({ type: "handleInput", payload: e.target.value });
    };
    return (
      <>
        <input value={state.text} onChange={handleChange} />
        <button
          disabled={!state.isValid}
          onClick={() => {
            console.log(state.text);
          }}
        >
          Submit
        </button>
      </>
    );
  }
  function reducer(state, action) {
    switch (action.type) {
      case "handleInput": {
        return {
          text: action.payload,
          isValid: action.payload.length > 0,
        };
      }
      default:
        throw new Error();
    }
  }
  return <Form />;
}

export default App;
